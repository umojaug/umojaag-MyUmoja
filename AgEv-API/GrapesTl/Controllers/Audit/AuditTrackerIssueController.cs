namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
[Route("api/[controller]")]
[ApiController]
public class AuditTrackerIssueController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;



    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AuditTrackerIssueView>("AuditTrackerIssueGetAll");

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
    //        var data = await _unitOfWork.SP_Call.List<AuditTrackerIssue>("AuditTrackerIssueGetAll");
    //        return Ok(data.Select(a => new { listId = a.AuditTrackerIssueId, listName = a.AuditTrackerIssueName }));
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
            parameter.Add("@AuditTrackerIssueId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AuditTrackerIssue>("AuditTrackerIssueGetById", parameter);

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
    public async Task<IActionResult> Create([FromForm] AuditTrackerIssue model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AuditType", model.AuditType);
            parameter.Add("@Year", model.Year);
            parameter.Add("@MonthOfAudit", model.MonthOfAudit);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@RegionId", model.RegionId);
            parameter.Add("@AuditIssue", model.AuditIssue);
            parameter.Add("@Risk", model.Risk);
            parameter.Add("@Recommendations", model.Recommendations);
            parameter.Add("@ImplementedBy", model.ImplementedBy);
            parameter.Add("@CommitmentDate", model.CommitmentDate);
            parameter.Add("@ImplementationDate", model.ImplementationDate);
            parameter.Add("@IssueStatus", model.IssueStatus);
            parameter.Add("@IaInCharge", model.IaInCharge);
            parameter.Add("@FollowUpDate", model.FollowUpDate);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditTrackerIssueCreate", parameter);

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
    public async Task<IActionResult> Update([FromBody] AuditTrackerIssueUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AuditTrackerIssueId", model.AuditTrackerIssueId);
            parameter.Add("@IssueStatus", model.IssueStatus);
            parameter.Add("@Comments", model.Comments);
            parameter.Add("@FollowUpDate", model.FollowUpDate);
            parameter.Add("@ImplementationDate", model.ImplementationDate);




            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditTrackerIssueUpdate", parameter);
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
            parameter.Add("@AuditTrackerIssueId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditTrackerIssueDelete", parameter);

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
