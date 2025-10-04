namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class MyOthersBillController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;


    [HttpGet("OthersBill/{id}")]
    public async Task<IActionResult> VerifyLoanAppList(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@TravelId", id);
            var data = await _unitOfWork.SP_Call.OneRecord<OthersBill>("OpsOthersBillGetAll", parameter);

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
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@OthersBillId", id);
            //parameter.Add("@EmployeeId", user.EmployeeId);


            var data = await _unitOfWork.SP_Call.OneRecord<OthersBill>("OpsOtehrsBillGetById", parameter);

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
    public async Task<IActionResult> Update([FromForm] OthersBill model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {

            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();


            parameter.Add("@OthersBillId", model.OthersBillId);
            parameter.Add("@DaAllowance", model.DaAllowance);
            parameter.Add("@HotelRent", model.HotelRent);
            parameter.Add("@Miscellaneous", model.Miscellaneous);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsOthersBillUpdate", parameter);
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





}
