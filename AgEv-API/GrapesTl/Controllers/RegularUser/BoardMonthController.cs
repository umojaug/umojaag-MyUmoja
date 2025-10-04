
namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class BoardMonthController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;

    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {

            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            //var parameter = new DynamicParameters();
            //parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<BoardMonthMaster>("BoardMonthlyGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    //[HttpGet("Select")]
    //public async Task<IActionResult> Select()
    //{
    //    try
    //    {
    //        var data = await _unitOfWork.SP_Call.List<BranchVisitView>("HrBranchVisitGetAll");
    //        return Ok(data.Select(a => new { listId = a.DepartmentId, listName = a.DepartmentName }));
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //       "Error retrieve list of data." + e.Message);
    //    }
    //}

    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@ReportId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<BoardMonthMaster>("BoardMonthlyGetById", parameter);

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

    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] BranchVisit model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            //parameter.Add("@BranchVisitId", model.BranchVisitId);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@VisitDate", model.VisitDate);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("BoardMonthlyCreate", parameter);

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

    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromForm] BoardMonthMaster model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@ReportId", model.ReportId);
            //parameter.Add("@ReportMonth", model.ReportMonth);
            //parameter.Add("@ReportYear", model.ReportYear);
            //parameter.Add("@CompanyId", model.CompanyId);
            //parameter.Add("@PreparedBy", model.PreparedBy);
            //parameter.Add("@ReportDate", model.ReportDate);
            parameter.Add("@ExecutiveSummary", model.ExecutiveSummary ??"");
            parameter.Add("@SignificantDevelopments", model.SignificantDevelopments??"");
            parameter.Add("@TotalHeadcount", model.TotalHeadcount?? "");
            parameter.Add("@TurnoverRateMonth", model.TurnoverRateMonth);
            parameter.Add("@TurnoverRateYTD", model.TurnoverRateYTD);
            parameter.Add("@SeniorLevelNewHires", model.SeniorLevelNewHires?? "");
            parameter.Add("@SeniorLevelVacancies", model.SeniorLevelVacancies ?? "");
            parameter.Add("@TrainingUpdates", model.TrainingUpdates ?? "");
            parameter.Add("@LegalCaseUpdates", model.LegalCaseUpdates ?? "");
            parameter.Add("@SystemPerformance", model.SystemPerformance ?? "");
            parameter.Add("@CybersecurityUpdates", model.CybersecurityUpdates ?? "");
            parameter.Add("@ITSupportGaps", model.ITSupportGaps ?? "");
            parameter.Add("@AuditPlanExecution", model.AuditPlanExecution ?? "");
            parameter.Add("@EmergingRisks", model.EmergingRisks ?? "");
            parameter.Add("@FraudSummary", model.FraudSummary ?? "");
            parameter.Add("@RiskSummary", model.RiskSummary ?? "");
            parameter.Add("@MitigationSteps", model.MitigationSteps ?? "");
            parameter.Add("@UpcomingPlans", model.UpcomingPlans ?? "");
            parameter.Add("@BoardInputNeeded", model.BoardInputNeeded ?? "");

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("BoardMonthlyUpdate", parameter);
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


    [HttpPost("submitted/{id}")]
    public async Task<IActionResult> Submitted(string id)
    {
        if (!ModelState.IsValid)
            return BadRequest("Invalid request data.");

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@ReportId", id);
            parameter.Add("@CreatedBy", user.FullName);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

            await _unitOfWork.SP_Call.Execute("BoardMonthlySubmitted", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, "Error updating status. " + e.Message);
        }
    }

    //[HttpDelete("Delete/{id}")]
    //public async Task<IActionResult> Delete(string id)
    //{
    //    try
    //    {
    //        var parameter = new DynamicParameters();
    //        parameter.Add("@BranchVisitId", id);

    //        parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
    //        await _unitOfWork.SP_Call.Execute("HrBranchVisitDelete", parameter);

    //        var message = parameter.Get<string>("Message");

    //        if (message == "Not found")
    //            return NotFound(message);

    //        if (message == "Cannot delete")
    //            return BadRequest(message);

    //        return NoContent();
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //         "Error deleting data." + e.Message);
    //    }
    //}

}
