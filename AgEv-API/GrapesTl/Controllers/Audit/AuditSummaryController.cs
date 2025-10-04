namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AuditSummaryController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;



    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    //[HttpGet("List/{id}")]
    //public async Task<IActionResult> List(string id)
    //{
    //    try
    //    {
    //        _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

    //        var parameter = new DynamicParameters();
    //        parameter.Add("@AuditId", id);

    //        var data = await _unitOfWork.SP_Call.List<AuditObservations>("AuditObservationsGetByAuditId", parameter);

    //        if (data == null)
    //            return NotFound(SD.Message_NotFound);

    //        return Ok(data);
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //       "Error retrieve details data." + e.Message);
    //    }
    //}

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AuditSummary>("AuditSummaryGetAll");

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
            parameter.Add("@SummaryId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AuditSummary>("AuditSummaryGetById", parameter);

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
    //public async Task<IActionResult> Create([FromForm] AuditObservations model)
    //{
    //    if (!ModelState.IsValid)
    //        return BadRequest(SD.Message_Model_Error);

    //    try
    //    {
    //        _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

    //        var parameter = new DynamicParameters();
    //        parameter.Add("@AuditId", model.AuditId);
    //        parameter.Add("@AuditArea", model.AuditArea);
    //        parameter.Add("@Details", model.Details);
    //        parameter.Add("@RootCause", model.RootCause);
    //        parameter.Add("@RiskRating", model.RiskRating);
    //        parameter.Add("@RiskImplication", model.RiskImplication);
    //        parameter.Add("@Recommendations", model.Recommendations);
    //        parameter.Add("@Attachment", model.Attachment);

    //        parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
    //        await _unitOfWork.SP_Call.Execute("AuditObservationsCreate", parameter);

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
    public async Task<IActionResult> Update([FromForm] AuditSummary model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var parameter = new DynamicParameters();
            parameter.Add("@SummaryId", model.SummaryId);
            parameter.Add("@AnnualAudit", model.AnnualAudit);
            parameter.Add("@FollowUpAudit", model.FollowUpAudit);
            parameter.Add("@Units", model.Units);
            parameter.Add("@RegionsAreas", model.RegionsAreas);
            parameter.Add("@TotalAudit", model.TotalAudit);
            parameter.Add("@NumberOfAuditStaff", model.NumberOfAuditStaff);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditSummaryUpdate", parameter);

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
            parameter.Add("@ObservationsId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditObservationsDelete", parameter);

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
