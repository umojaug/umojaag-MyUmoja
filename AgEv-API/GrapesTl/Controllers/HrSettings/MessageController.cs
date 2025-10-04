namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class HrMessageController(IUnitOfWork unitOfWork, IMailSender mailSender, ILogger<HrMessageController> logger) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<HrMessageController> _logger = logger;
    private string _userId;



    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<Message>("hrMessageGetAllById");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
    [HttpPost("Send")]
    public async Task<IActionResult> Send([FromForm] Message model)
    {
        List<string> employeeIds = model.EmployeeIds.Split(',').ToList();
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            foreach (var employeeId in employeeIds)
            {
                var parameter = new DynamicParameters();
                parameter.Add("@Note", model.Note);
                parameter.Add("@employeeId", employeeId);
                parameter.Add("@EntryBy", user.FullName);

                parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
                await _unitOfWork.SP_Call.Execute("HrMessageCreate", parameter);

                var email = parameter.Get<string>("Message");
                if (string.IsNullOrWhiteSpace(email) == false)
                {
                    try
                    {

                        var tmp = await _mailSender.SendEmailWithBody(
                            email,
                            "",
                            SD.BccEmail,

                            user.FullName + " send you message on " + DateTime.Now.Date,
                            model.Note);
                        //await _emailSender.SendEmailAsync(
                        //email,
                        //user.FullName + " send you messaage on " + DateTime.Now.Date,
                        //model.Note);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogInformation("Remote work Error at: {ex}", ex.Message);
                    }
                }
            }



            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }
}
