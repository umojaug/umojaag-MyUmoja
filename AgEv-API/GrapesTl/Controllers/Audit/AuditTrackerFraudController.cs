namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin, Internal Audit Manager, Assistant Audit Manager, Internal Audit Officer")]
[Route("api/[controller]")]
[ApiController]
public class AuditTrackerFraudController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;


    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<SpecialInvestigationReportView>("AuditTrackerFraudGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }




    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@ReportId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<SpecialInvestigationReportView>("AuditTrackerFraudGetById", parameter);

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
    public async Task<IActionResult> Create([FromForm] AuditTrackerFraud model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Year", model.Year);
            parameter.Add("@MonthOfAudit ", model.MonthOfAudit);
            //parameter.Add("@BranchId ", model.BranchId);
            //parameter.Add("@RegionId ", model.RegionId);
            parameter.Add("@DetectionMethod ", model.DetectionMethod);
            //parameter.Add("@TypeOfFraudId ", model.TypeOfFraudId);
            //parameter.Add("@BriefDescriptionOfFraud ", model.BriefDescriptionOfFraud);
            parameter.Add("@WhoMightBeInvolved ", model.WhoMightBeInvolved);
            parameter.Add("@PositionOfFraudster ", model.PositionOfFraudster);
            //parameter.Add("@FraudStatus", model.FraudStatus);
            parameter.Add("@DefectiveControlsIdentified ", model.DefectiveControlsIdentified);
            // parameter.Add("@TotalCostofFraud", model.TotalCostofFraud);
            //parameter.Add("@TotalRecoveriesMade ", model.TotalRecoveriesMade);
            //parameter.Add("@NetCostOfFraud ", model.NetCostOfFraud);
            //parameter.Add("@HrAction ", model.HrAction);
            //parameter.Add("@FinalManagementDecision", model.FinalManagementDecision);
            //parameter.Add("@Remarks ", model.Remarks);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditTrackerFraudCreate", parameter);

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
    public async Task<IActionResult> Update([FromBody] AuditTrackerFraudUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@ReportId", model.ReportId);
            parameter.Add("@Status", model.Status);
            parameter.Add("@Comments", model.Comments);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditTrackerFraudUpdate", parameter);
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


    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FraudId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditTrackerFraudDelete", parameter);

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
