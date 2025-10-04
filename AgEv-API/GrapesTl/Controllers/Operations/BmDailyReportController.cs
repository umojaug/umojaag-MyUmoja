namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class BmDailyReportController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;


    [HttpGet("List/{id}")]
    public async Task<IActionResult> List(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@BmVisitId", id);
            var data = await _unitOfWork.SP_Call.List<BmDailyReport>("OpsBmDailyReportGetAll", parameter);

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
            parameter.Add("@OpsBmDailyReportId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<BmDailyReport>("OpsBmDailyReportGetById", parameter);

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

    [Authorize]
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] BmDailyReport model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@BmVisitId", model.BmVisitId);
            parameter.Add("@AdmissionNumber", model.AdmissionNumber);
            parameter.Add("@DisbursementNumber", model.DisbursementNumber);
            parameter.Add("@DisbursementAmount", model.DisbursementAmount);
            parameter.Add("@SecurityNumber", model.SecurityNumber);
            parameter.Add("@SecurityAmount", model.SecurityAmount);
            parameter.Add("@OverdueNumber", model.OverdueNumber);
            parameter.Add("@OverdueAmount", model.OverdueAmount);
            parameter.Add("@BorrowerPositionNumber", model.BorrowerPositionNumber);
            parameter.Add("@BorrowerPositionAmount", model.BorrowerPositionAmount);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsBmDailyReportCreate", parameter);

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
    public async Task<IActionResult> Update([FromBody] BmDailyReport model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@OpsBmDailyReportId", model.OpsBmDailyReportId);
            parameter.Add("@BmVisitId", model.BmVisitId);
            parameter.Add("@AdmissionNumber", model.AdmissionNumber);
            parameter.Add("@DisbursementNumber", model.DisbursementNumber);
            parameter.Add("@DisbursementAmount", model.DisbursementAmount);
            parameter.Add("@SecurityNumber", model.SecurityNumber);
            parameter.Add("@SecurityAmount", model.SecurityAmount);
            parameter.Add("@OverdueNumber", model.OverdueNumber);
            parameter.Add("@OverdueAmount", model.OverdueAmount);
            parameter.Add("@BorrowerPositionNumber", model.BorrowerPositionNumber);
            parameter.Add("@BorrowerPositionAmount", model.BorrowerPositionAmount);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsBmDailyReportUpdate", parameter);
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
            parameter.Add("@OpsBmDailyReportId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsBmDailyReportDelete", parameter);

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
