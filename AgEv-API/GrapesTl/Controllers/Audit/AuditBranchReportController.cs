namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
[Route("api/[controller]")]
[ApiController]
public class AuditBranchReportController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AuditBranchReportView>("AuditBranchReportGetAll");

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

            var data = await _unitOfWork.SP_Call.OneRecord<AuditBranchReport>("AuditBranchReportGetById", parameter);

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



    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromForm] AuditBranchReport model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {


            var parameter = new DynamicParameters();
            parameter.Add("@ReportId", model.ReportId);
            parameter.Add("@ReportingQuarter", model.ReportingQuarter);
            parameter.Add("@MonthOfAudit", model.MonthOfAudit);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@BranchOverview", model.BranchOverview);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditBranchReportUpdate", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Already exists")
                return BadRequest(message);

            //var findEmployee = new DynamicParameters();
            //findEmployee.Add("@EmployeeId", model.ImplementedBy);

            //var data = await _unitOfWork.SP_Call.OneRecord<EmployeeGetById>("hrEmployeeGetById", findEmployee);

            // Audior Email come from AuditWorkplanUpdate message 
            //if (string.IsNullOrWhiteSpace(data.Email) == false)
            //{
            //    try
            //    {
            //        var tmp = await _mailSender.SendEmailWithBody(
            //            data.Email,
            //            data.EmployeeName,
            //            SD.BccEmail,
            //            SD.AuditNotification,
            //            $"Dear {data.EmployeeName}, You have an Audit notification.");
            //    }
            //    catch (Exception ex)
            //    {
            //        _logger.LogInformation("Remote work Error at: {ex}", ex.Message);
            //    }
            //}

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
