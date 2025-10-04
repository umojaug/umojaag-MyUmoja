namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ApplicationsController(IUnitOfWork unitOfWork, IMailSender mailSender, ILogger<ApplicationsController> logger) : ControllerBase
{

    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<ApplicationsController> _logger = logger;
    private string _userId;




    [HttpGet("Leave")]
    public async Task<IActionResult> Leave()
    {

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@AuthorityId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<EmpLeaveView>("hrEmpLeaveGetAllPending", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromBody] EmpLeaveUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@EmpLeaveId", model.EmpLeaveId);
            parameter.Add("@LeaveStatus", model.LeaveStatus);
            parameter.Add("@Comments", model.Comments);
            parameter.Add("@EmailTo", "", dbType: DbType.String, direction: ParameterDirection.Output);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmpLeaveUpdateByAuthority", parameter);
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
                        SD.LeaveRecommendation,
                        message);
                    //await _emailSender.SendEmailAsync(
                    //    "hr@umojamicrofinance.com;" + emailTo,
                    //    "Leave Recommendation",
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
}
