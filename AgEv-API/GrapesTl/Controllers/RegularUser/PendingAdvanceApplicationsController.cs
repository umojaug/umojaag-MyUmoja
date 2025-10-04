namespace GrapesTl.Controllers;

[Authorize(Roles = "IT Manager,Area Manager,Operations Manager,Super Admin,Branch Manager,Regional Manager,Operations Head, Country Team Lead,HR Manager,Audit Manager,Accounts Manager")]
[Route("api/[controller]")]
[ApiController]
public class PendingAdvanceApplicationsController(IUnitOfWork unitOfWork, IMailSender mailSender, ILogger<PendingAdvanceApplicationsController> logger) : ControllerBase
{

    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<PendingAdvanceApplicationsController> _logger = logger;
    private string _userId;



    [HttpGet("List")]
    public async Task<IActionResult> List()
    {

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@AuthorityId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<EmpAdvanceView>("hrEmpAdvanceGetAllPending", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromBody] EmpAdvanceUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@AdvanceId", model.AdvanceId);
            parameter.Add("@AdvanceStatus", model.AdvanceStatus);
            parameter.Add("@Comments", model.Comments);
            parameter.Add("@EmailTo", "", dbType: DbType.String, direction: ParameterDirection.Output);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmpAdvanceUpdateByAuthority", parameter);
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
                       SD.AdvanceSalaryRecommended,
                       message);

                    //await _mailSender.SendEmailWithBody(
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

    [HttpGet("Recommendedlist")]
    public async Task<IActionResult> Recommendedlist()
    {

        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpAdvanceView>("hrEmpAdvanceSalaryGetAllRecommended");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpPost("HrUpdate")]
    public async Task<IActionResult> HrUpdate([FromBody] EmpAdvanceUpdate model)
    {
        _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AdvanceId", model.AdvanceId);
            parameter.Add("@AdvanceStatus", model.AdvanceStatus);
            parameter.Add("@Comments", model.Comments);
            parameter.Add("@HrId", user.EmployeeId);
            parameter.Add("@InstalmentNo", model.InstalmentNo);
            parameter.Add("@EmailTo", "", dbType: DbType.String, direction: ParameterDirection.Output);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmpAdvanceSalaryUpdateByHr", parameter);
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
                        SD.AdvanceSalaryApproved,
                        message);
                    //await _mailSender.SendEmailWithBody(
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

}
