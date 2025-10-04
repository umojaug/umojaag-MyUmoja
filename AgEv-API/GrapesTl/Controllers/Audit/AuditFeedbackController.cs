namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AuditFeedbackController(IUnitOfWork unitOfWork, IFileUploadService fileUploadService, IMailSender mailSender, ILogger<EmployeeSetupController> logger) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<EmployeeSetupController> _logger = logger;
    private readonly IFileUploadService _fileUploadService = fileUploadService;
    private string _userId;

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AuditFeedbackView>("AuditFeedbackGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("AuditStatusDone")]
    public async Task<IActionResult> AuditStatusDone()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<AuditStatusDone>("AuditFeedbackDoneGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("AuditFeedbackOwn")]
    public async Task<IActionResult> AuditFeedbackOwn()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<AuditFeedback>("AuditFeedbackOwnGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] AuditFeedback model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);


            var parameter = new DynamicParameters();
            parameter.Add("@WorkPlanId", model.WorkPlanId);
            parameter.Add("@WhatWentWell", model.WhatWentWell);
            parameter.Add("@HandledBetter", model.HandledBetter);
            parameter.Add("@KeyLearningPoints", model.KeyLearningPoints);
            parameter.Add("@InterPersonalRatings", model.InterPersonalRatings);
            parameter.Add("@InterPersonalComments", model.InterPersonalComments);
            parameter.Add("@AbilityToRatings", model.AbilityToRatings);
            parameter.Add("@AbilityToComments", model.AbilityToComments);
            parameter.Add("@AuditFindingsRatings", model.AuditFindingsRatings);
            parameter.Add("@AuditFindingsComments", model.AuditFindingsComments);
            parameter.Add("@AuditScopeRatings", model.AuditScopeRatings);
            parameter.Add("@AuditScopeComments", model.AuditScopeComments);
            parameter.Add("@AgreementWithAuditeesRatings", model.AgreementWithAuditeesRatings);
            parameter.Add("@AgreementWithAuditeesComments", model.AgreementWithAuditeesComments);
            parameter.Add("@OtherComments", model.OtherComments);
            parameter.Add("@EmployeeId", user.EmployeeId);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditFeedbackCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            //return Created("", SD.Message_Save);
            return Created("", message);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@ReportId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditBranchReportDelete", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Cannot delete")
                return BadRequest(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
             "Error deleting data." + e.Message);
        }
    }

}
