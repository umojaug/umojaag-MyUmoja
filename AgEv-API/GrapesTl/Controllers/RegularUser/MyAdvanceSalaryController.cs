namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class MyAdvanceSalaryController(IUnitOfWork unitOfWork, IMailSender mailSender, ILogger<MyAdvanceSalaryController> logger) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<MyAdvanceSalaryController> _logger = logger;
    private string _userId;


    [HttpGet("Balance")]
    public async Task<IActionResult> Balance()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<EmpLeaveBalanceView>("hrEmpLeaveBookGetById", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<EmpAdvanceView>("hrEmpAdvanceGetById", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("View/{id}")]
    public async Task<IActionResult> View(string id)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@AdvanceId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<EmpAdvanceView>("hrEmpAdvanceViewGetById", parameter);

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
    //        var parameter = new DynamicParameters();

    //        var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeMgtGetForSelect", parameter);
    //        return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //       "Error retrieve list of data." + e.Message);
    //    }
    //}

    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] EmpAdvanceSalary model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@AdvanceAmount", model.AdvanceAmount);
            parameter.Add("@PurposeOfAdvance", model.PurposeOfAdvance);
            parameter.Add("@NeededAdvanceDate", model.NeededAdvanceDate);
            parameter.Add("@AuthorityPinName", model.PinName);
            parameter.Add("@EntryBy", user.EmployeeId);
            parameter.Add("@MAILUSERNAME", SD.BccEmail);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmpAdvancePayCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Select correct person for approval")
                return NotFound(message);

            if (string.IsNullOrWhiteSpace(message) == false)
            {
                try
                {

                    var tmp = await _mailSender.SendEmailWithBody(
                        message,
                        "",
                        SD.BccEmail,

                        "Leave Application by " + user.FullName,
                        $"{user.FullName} apply for Advance Salary. Needed The salary of date {model.NeededAdvanceDate:dd/MMM/yyyy} ");

                    //await _emailSender.SendEmailAsync(
                    //    message,
                    //    "Leave Application by " + user.FullName,
                    //    $"{user.FullName} apply for Advance Salay. Needed The salary of date {model.NeededAdvanceDate:dd/MMM/yyyy} ");
                }
                catch (Exception ex)
                {
                    _logger.LogInformation("Remote work Error at: {ex}", ex.Message);
                }
            }

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }


    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AdvanceId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmpAdvanceSalaryDelete", parameter);

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
