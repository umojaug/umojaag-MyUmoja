namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AmBranchPerformanceController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;



    [HttpGet("List/{id}")]
    public async Task<IActionResult> List(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AmVisitId", id);
            var data = await _unitOfWork.SP_Call.List<AmBranchPerformance>("OpsAmBranchPerformanceGetAll", parameter);

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
            parameter.Add("@OpsAmBranchPerformanceId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AmBranchPerformance>("OpsAmBranchPerformanceGetById", parameter);

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
    public async Task<IActionResult> Create([FromBody] AmBranchPerformance model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AmVisitId", model.AmVisitId);
            parameter.Add("@LoName", model.LoName);
            parameter.Add("@NumberOfGroup", model.NumberOfGroup);
            parameter.Add("@OverdueNumber", model.OverdueNumber);
            parameter.Add("@OverdueAmount", model.OverdueAmount);
            parameter.Add("@NumberOfBorrower", model.NumberOfBorrower);
            parameter.Add("@NumberOfAdmission", model.NumberOfAdmission);
            parameter.Add("@SecurityReturn", model.SecurityReturn);
            parameter.Add("@Remarks", model.Remarks);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAmBranchPerformanceCreate", parameter);

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
    public async Task<IActionResult> Update([FromBody] AmBranchPerformance model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@OpsAmBranchPerformanceId", model.OpsAmBranchPerformanceId);
            parameter.Add("@AmVisitId", model.AmVisitId);
            parameter.Add("@LoName", model.LoName);
            parameter.Add("@NumberOfGroup", model.NumberOfGroup);
            parameter.Add("@OverdueNumber", model.OverdueNumber);
            parameter.Add("@OverdueAmount", model.OverdueAmount);
            parameter.Add("@NumberOfBorrower", model.NumberOfBorrower);
            parameter.Add("@NumberOfAdmission", model.NumberOfAdmission);
            parameter.Add("@SecurityReturn", model.SecurityReturn);
            parameter.Add("@Remarks", model.Remarks);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAmBranchPerformanceUpdate", parameter);
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
            parameter.Add("@OpsAmBranchPerformanceId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAmBranchPerformanceDelete", parameter);

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
