namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AcBusinessDayController(IUnitOfWork unitOfWork, IHttpContextAccessor accessor) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly string _userId = accessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

    //Okay
    [HttpGet("statusByBranch")]
    public async Task<IActionResult> StatusByBranch()
    {
        try
        {

            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);
            var data = await _unitOfWork.SP_Call.OneRecord<AcBusinessDayDto>("AcBusinessDayStatusByBranch", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    //Okay
    [HttpGet("statusList")]
    public async Task<IActionResult> StatusList()
    {
        try
        {

            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@Role", user.Role);
            var data = await _unitOfWork.SP_Call.List<AcBusinessDayDto>("AcBusinessDayStatusGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    //Okay
    [HttpPost("open")]
    public async Task<IActionResult> Open()
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {

            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@FullName", user.FullName);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AcBusinessDayOpen", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Business Day is Already Opened.")
                return BadRequest(message);

            if (message == "Cannot open a future business date.")
                return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    //Okay
    [HttpPost("dayCloseRequest/{id}")]
    public async Task<IActionResult> DayCloseRequest(string id)
    {
        try
        {

            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@BusinessDayId", id);
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@FullName", user.FullName);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AcBusinessDayCloseRequest", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Voucher total debit and credit mismatch.")
                return BadRequest(message);

            if (message == "Already request for day close.")
                return BadRequest(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
             "Error deleting data." + e.Message);
        }
    }

    [HttpPost("dayCloseApprove/{id}")]
    public async Task<IActionResult> DayCloseApprove(string id)
    {
        try
        {


            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();

            parameter.Add("@BusinessDayId", id);
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@FullName", user.FullName);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AcBusinessDayCloseApprove", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already day close.")
                return BadRequest(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
             "Error deleting data." + e.Message);
        }
    }

    //Okay
    [HttpGet("dailyDenomination/{id}")]
    public async Task<IActionResult> DailyDenomination(string id)
    {
        try
        {

            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@BusinessDayId", id);

            var denomination = await _unitOfWork.SP_Call.List<DenominationDto>("AcDailyDenominationById", parameter);

            var cashBalanceParams = new DynamicParameters();
            cashBalanceParams.Add("@EmployeeId", user.EmployeeId);

            //parameter.Add("@EmployeeId", user.EmployeeId);
            var cashBalance = await _unitOfWork.SP_Call.OneRecord<double>("AcCashBalance", cashBalanceParams);

            return Ok(new { denomination, cashBalance });
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    //Okay
    [HttpPost("denomination")]
    public async Task<IActionResult> Denomination([FromBody] List<Denomination> models)
    {
        try
        {


            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            foreach (var model in models)
            {
                var parameter = new DynamicParameters();
                parameter.Add("@BusinessDayId", model.BusinessDayId);
                parameter.Add("@NoteValue", model.NoteValue);
                parameter.Add("@NoteCount", model.NoteCount);
                await _unitOfWork.SP_Call.Execute("AcDenominationUpdate", parameter);
            }

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
             "Error deleting data." + e.Message);
        }
    }

}
