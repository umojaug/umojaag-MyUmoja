namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AuditExcutionUnitStepsController(IUnitOfWork unitOfWork, IFileUploadService fileUploadService) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IFileUploadService _fileUploadService = fileUploadService;

    private string _userId;


    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]

    [HttpGet("List/{id}/{auditAreaId}")]
    public async Task<IActionResult> List(string id, string auditAreaId)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@ExcutionId", id);
            parameter.Add("@AuditAreaId", auditAreaId);

            var data = await _unitOfWork.SP_Call.List<AuditExcutionUnitTestStepsView>("AuditExcutionUnitStepsGetAll", parameter);

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
    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


            var parameter = new DynamicParameters();
            parameter.Add("@ExecutionUnitTestStepId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AuditExcutionUnitTestStepsView>("AuditExcutionUnitStepsGetById", parameter);

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

    //[Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    //[HttpPost("Create")]
    //public async Task<IActionResult> Create([FromForm] AuditWorkplan model)
    //{
    //    if (!ModelState.IsValid)
    //        return BadRequest(SD.Message_Model_Error);

    //    try
    //    {

    //        _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
    //        var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

    //        var parameter = new DynamicParameters();
    //        parameter.Add("@EmployeeId", user.EmployeeId);
    //        parameter.Add("@MonthName", model.MonthName);
    //        parameter.Add("@BranchId", model.BranchId);
    //        parameter.Add("@RiskRating", model.RiskRating);
    //        parameter.Add("@Auditor", model.Auditor);
    //        parameter.Add("@FieldDays", model.FieldDays);
    //        parameter.Add("@ExpectedCost", model.ExpectedCost);
    //        parameter.Add("@AuditStatus", model.AuditStatus);
    //        parameter.Add("@ReportStatus", model.ReportStatus);
    //        parameter.Add("@DiscussionStatus", model.DiscussionStatus);
    //        parameter.Add("@FollowUpStatus", model.FollowUpStatus);

    //        parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
    //        await _unitOfWork.SP_Call.Execute("AuditWorkplanCreate", parameter);

    //        var message = parameter.Get<string>("Message");

    //        if (message == "Already exists")
    //            return BadRequest(message);

    //        return Created("", SD.Message_Save);
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //       "Error saving data." + e.Message);
    //    }
    //}

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromForm] AuditExcutionUnitTestSteps model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var fileUrl = "";
            if (model.File is not null && model.File.Length > 0)
                fileUrl = await _fileUploadService.GetUploadUrlAsync(model.File);


            var parameter = new DynamicParameters();
            parameter.Add("@ExecutionUnitTestStepId", model.ExecutionUnitTestStepId);
            parameter.Add("@TestingDate", model.TestingDate);
            parameter.Add("@SampledMonth", model.SampledMonth);
            parameter.Add("@AuditPeriod", model.AuditPeriod ?? "");
            parameter.Add("@SelectionMethod", model.SelectionMethod ?? "");
            parameter.Add("@ControlFrequency", model.ControlFrequency ?? "");
            parameter.Add("@SampleSize", model.SampleSize);
            parameter.Add("@PopulationSize", model.PopulationSize);
            parameter.Add("@TestingConclusion", model.TestingConclusion ?? "");
            parameter.Add("@TestResults", model.TestResults ?? "");
            parameter.Add("@TestEvidences", fileUrl);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditExcutionUnitStepsUpdate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);


            if (message == "Already exists")
                return BadRequest(message);

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
