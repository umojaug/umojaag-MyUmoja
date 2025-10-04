namespace GrapesTl.Controllers;


[Authorize(Roles = "Grapes Admin")]
[Route("api/[controller]")]
[ApiController]
public class DatabaseResetController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;


    [HttpPost("databaseReset")]
    public async Task<IActionResult> DatabaseReset([FromForm] Remarks model)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Particulars", model.Particulars);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("CaDatabaseReset", parameter);

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

}
