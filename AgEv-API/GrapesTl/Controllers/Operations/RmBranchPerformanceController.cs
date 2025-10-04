namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class RmBranchPerformanceController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;


    [HttpGet("list/{id}")]
    public async Task<IActionResult> List(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@RmVisitId", id);
            var data = await _unitOfWork.SP_Call.List<RmBranchPerformance>("OpsRmBranchPerformanceGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }




    [HttpGet("details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@OpsRmBranchPerformanceId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<RmBranchPerformance>("OpsRmBranchPerformanceGetById", parameter);

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
    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] RmBranchPerformance model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@RmVisitId", model.RmVisitId);
            parameter.Add("@LoName", model.LoName);
            parameter.Add("@NumberOfGroup", model.NumberOfGroup);
            parameter.Add("@OverdueNumber", model.OverdueNumber);
            parameter.Add("@OverdueAmount", model.OverdueAmount);
            parameter.Add("@NumberOfBorrower", model.NumberOfBorrower);
            parameter.Add("@NumberOfAdmission", model.NumberOfAdmission);
            parameter.Add("@SecurityReturn", model.SecurityReturn);
            parameter.Add("@Remarks", model.Remarks);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsRmBranchPerformanceCreate", parameter);

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


    [HttpPost("update")]
    public async Task<IActionResult> Update([FromBody] RmBranchPerformance model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@OpsRmBranchPerformanceId", model.OpsRmBranchPerformanceId);
            parameter.Add("@RmVisitId", model.RmVisitId);
            parameter.Add("@LoName", model.LoName);
            parameter.Add("@NumberOfGroup", model.NumberOfGroup);
            parameter.Add("@OverdueNumber", model.OverdueNumber);
            parameter.Add("@OverdueAmount", model.OverdueAmount);
            parameter.Add("@NumberOfBorrower", model.NumberOfBorrower);
            parameter.Add("@NumberOfAdmission", model.NumberOfAdmission);
            parameter.Add("@SecurityReturn", model.SecurityReturn);
            parameter.Add("@Remarks", model.Remarks);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsRmBranchPerformanceUpdate", parameter);
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


    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@OpsRmBranchPerformanceId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsRmBranchPerformanceDelete", parameter);

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
