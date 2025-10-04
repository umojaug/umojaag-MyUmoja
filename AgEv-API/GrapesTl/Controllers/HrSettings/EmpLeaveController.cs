namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
[Route("api/[controller]")]
[ApiController]
public class EmpLeaveController(IUnitOfWork unitOfWork, IMailSender mailSender, ILogger<EmpLeaveController> logger) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<EmpLeaveController> _logger = logger;
    private string _userId;


    [HttpGet("Recommendedlist")]
    public async Task<IActionResult> Recommendedlist()
    {

        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpLeaveView>("hrEmpLeaveGetAllRecommended");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("PendingCount")]
    public async Task<IActionResult> PendingCount()
    {

        try
        {
            var data = await _unitOfWork.SP_Call.Single<int>("hrEmpLeaveGetPendingCount");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Search/{id}")]
    public async Task<IActionResult> Search(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Search", id);

            var data = await _unitOfWork.SP_Call.List<EmpLeaveView>("hrEmpLeaveGetBySearch", parameter);

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
    public async Task<IActionResult> Create([FromForm] EmpLeave model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeePinName", model.PinName);
            parameter.Add("@LeaveId", model.LeaveId);
            parameter.Add("@FromDate", model.FromDate);
            parameter.Add("@TillDate", model.TillDate);
            parameter.Add("@Particulars", model.Particulars);
            parameter.Add("@EntryBy", user.FullName);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmpLeaveCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Leave not available")
                return NotFound(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromBody] EmpLeaveUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EmpLeaveId", model.EmpLeaveId);
            parameter.Add("@LeaveStatus", model.LeaveStatus);
            parameter.Add("@Comments", model.Comments);
            parameter.Add("@EmailTo", "", dbType: DbType.String, direction: ParameterDirection.Output);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmpLeaveUpdateByHr", parameter);
            var message = parameter.Get<string>("Message");
            var emailTo = parameter.Get<string>("EmailTo");

            if (message == "Not found")
                return NotFound(message);

            if (string.IsNullOrWhiteSpace(message) == false && string.IsNullOrWhiteSpace(emailTo) == false)
            {
                try
                {

                    var tmp = await _mailSender.SendEmailWithBody(
                        emailTo,
                        "",
                        SD.BccEmail,
                        SD.LeaveApproved,
                        message);
                    //await _emailSender.SendEmailAsync(
                    //    "hr@umojamicrofinance.com;" + emailTo,
                    //    "Leave Approved",
                    //    message);
                }
                catch (Exception ex)
                {
                    _logger.LogInformation("Remote work Error at: {ex}", ex.Message);
                }
            }

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error updating data." + e.Message);
        }
    }

    [HttpPost("LeaveProcess")]
    public async Task<IActionResult> LeaveProcess()
    {

        try
        {
            await _unitOfWork.SP_Call.Execute("hrEmpLeaveProcess");

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EmpLeaveId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmpLeaveDelete", parameter);

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
