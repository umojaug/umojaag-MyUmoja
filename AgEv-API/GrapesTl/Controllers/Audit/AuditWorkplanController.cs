namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AuditWorkplanController(IUnitOfWork unitOfWork, IMailSender mailSender, ILogger<EmployeeSetupController> logger) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<EmployeeSetupController> _logger = logger;
    private string _userId;



    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AuditWorkplanView>("AuditWorkplanGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


            var parameter = new DynamicParameters();
            parameter.Add("@WorkPlanId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AuditWorkplan>("AuditWorkplanGetById", parameter);

            if (data == null)
                return NotFound(SD.Message_NotFound);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve details data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] AuditWorkplan model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {

            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@MonthName", model.MonthName);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@OverallRiskRating", model.OverallRiskRating);
            parameter.Add("@Auditor", model.Auditor);
            parameter.Add("@FieldDays", model.FieldDays);
            parameter.Add("@ExpectedCost", model.ExpectedCost);
            parameter.Add("@AuditStatus", model.AuditStatus);
            parameter.Add("@ReportStatus", model.ReportStatus);
            parameter.Add("@DiscussionStatus", model.DiscussionStatus);
            parameter.Add("@FollowUpStatus", model.FollowUpStatus);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditWorkplanCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromForm] AuditWorkplan model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@WorkPlanId", model.WorkPlanId);
            parameter.Add("@MonthName", model.MonthName);
            parameter.Add("@Auditor", model.Auditor);
            parameter.Add("@FieldDays", model.FieldDays);
            parameter.Add("@ExpectedCost", model.ExpectedCost);
            parameter.Add("@AuditStatus", model.AuditStatus);
            parameter.Add("@ReportStatus", model.ReportStatus);
            parameter.Add("@DiscussionStatus", model.DiscussionStatus);
            parameter.Add("@FollowUpStatus", model.FollowUpStatus);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditWorkplanUpdate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);


            if (message == "Not Approved")
                return BadRequest(message);

            var findEmployee = new DynamicParameters();
            findEmployee.Add("@EmployeeId", model.Auditor);

            var data = await _unitOfWork.SP_Call.OneRecord<EmployeeGetById>("hrEmployeeGetById", findEmployee);

            // Audior Email come from AuditWorkplanUpdate message 
            if (string.IsNullOrWhiteSpace(data.Email) == false)
            {
                try
                {
                    var tmp = await _mailSender.SendEmailWithBody(
                        data.Email,
                        data.EmployeeName,
                        SD.BccEmail,
                        SD.AuditNotification,
                        $"Dear {data.EmployeeName}, You have been assigned an audit in the work plan.");
                }
                catch (Exception ex)
                {
                    _logger.LogInformation("Remote work Error at: {ex}", ex.Message);
                }
            }

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error updating data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


            var parameter = new DynamicParameters();
            parameter.Add("@workPlanId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditWorkPlanDelete", parameter);

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
