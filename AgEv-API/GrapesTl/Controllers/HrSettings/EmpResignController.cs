namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
[Route("api/[controller]")]
[ApiController]
public class EmpResignController(IUnitOfWork unitOfWork, IMailSender mailSender, IConfiguration configuration, ILogger<EmpResignController> logger) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly IConfiguration _configuration = configuration;
    private readonly ILogger<EmpResignController> _logger = logger;
    private string _userId;


    [HttpGet("Search/{id}")]
    public async Task<IActionResult> Search(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Search", id);

            var data = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmpResignGetBySearch", parameter);

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
    public async Task<IActionResult> Create([FromForm] EmpResign model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@PinName", model.PinName);
            parameter.Add("@ResignReasonId", model.ResignReasonId);
            parameter.Add("@Particulars", model.Particulars);
            parameter.Add("@ResignDate", model.ResignDate);
            parameter.Add("@EntryBy", user.FullName);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            parameter.Add("@Email", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmpResignCreate", parameter);

            var message = parameter.Get<string>("Message");
            var Email = parameter.Get<string>("Email");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Already exists")
                return NotFound(message);

            if (string.IsNullOrWhiteSpace(Email) == false)
            {
                try
                {
                    var callbackUrl = SD.InterviewCallBack + message;
                    var tmp = await _mailSender.SendEmailWithBody(
                        Email,
                        "",
                        SD.BccEmail,
                        SD.ExitInterview,
                        $"Please provide your feedback by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

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
            parameter.Add("@EmployeeResignId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmpResignDelete", parameter);

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
