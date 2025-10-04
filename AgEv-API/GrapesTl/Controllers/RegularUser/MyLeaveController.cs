namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class MyLeaveController(IUnitOfWork unitOfWork, IMailSender mailSender, ILogger<MyLeaveController> logger, IFileUploadService fileUploadService) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<MyLeaveController> _logger = logger;
    private string _userId;
    private readonly IFileUploadService _fileUploadService = fileUploadService;


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

            var data = await _unitOfWork.SP_Call.List<EmpLeaveView>("hrEmpLeaveGetById", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Select")]
    public async Task<IActionResult> Select()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeMgtSelect", parameter);
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
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

            var fileUrl = "";
            if (model.File is not null && model.File.Length > 0)
                fileUrl = await _fileUploadService.GetUploadUrlAsync(model.File);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@LeaveId", model.LeaveId);
            parameter.Add("@FromDate", model.FromDate);
            parameter.Add("@TillDate", model.TillDate);
            parameter.Add("@Particulars", model.Particulars);
            parameter.Add("@AuthorityPinName", model.PinName);
            parameter.Add("@FileUrl", fileUrl);
            parameter.Add("@MAILUSERNAME", SD.BccEmail);

            parameter.Add("@EntryBy", user.FullName);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmpLeaveCreateByUser", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Wrong till date")
                return NotFound(message);

            if (message == "Select correct person for approval")
                return NotFound(message);

            if (message == "Leave balance not available")
                return BadRequest(message);

            if (string.IsNullOrWhiteSpace(message) == false)
            {
                try
                {

                    var tmp = await _mailSender.SendEmailWithBody(
                        message,
                        "",
                        SD.BccEmail,

                        "Leave Application by " + user.FullName,
                        $"{user.FullName} apply for leave from {model.FromDate:dd/MMM/yyyy} till {model.TillDate:dd/MMM/yyyy}");

                    //await _emailSender.SendEmailAsync(
                    //    message,
                    //    "Leave Application by " + user.FullName,
                    //    $"{user.FullName} apply for leave from {model.FromDate:dd/MMM/yyyy} till {model.TillDate:dd/MMM/yyyy}");
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
