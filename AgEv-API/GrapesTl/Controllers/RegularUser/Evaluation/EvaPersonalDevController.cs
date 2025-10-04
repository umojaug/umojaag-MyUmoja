namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class EvaPersonalDevController(IUnitOfWork unitOfWork, IMailSender mailSender, ILogger<EmployeesController> logger) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<EmployeesController> _logger = logger;
    private string _userId;



    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaluationId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<EvaPersonalDev>("UrEvaPersonalDevGetByEvaId", parameter);

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
    public async Task<IActionResult> Update([FromForm] EvaPersonalDev model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaPersonalDevId", model.EvaPersonalDevId);
            parameter.Add("@DevelopmentNeedOne", model.DevelopmentNeedOne);
            parameter.Add("@SupportByOne", model.SupportByOne);
            parameter.Add("@TimelineOne", model.TimelineOne);
            parameter.Add("@ReviewDateOne", model.ReviewDateOne);
            parameter.Add("@DevelopmentNeedTwo", model.DevelopmentNeedTwo);
            parameter.Add("@SupportByTwo", model.SupportByTwo);
            parameter.Add("@TimelineTwo", model.TimelineTwo);
            parameter.Add("@ReviewDateTwo", model.ReviewDateTwo);
            parameter.Add("@DevelopmentNeedThree", model.DevelopmentNeedThree);
            parameter.Add("@SupportByThree", model.SupportByThree);
            parameter.Add("@TimelineThree", model.TimelineThree);
            parameter.Add("@ReviewDateThree", model.ReviewDateThree);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("UrEvaPersonalDevUpdate", parameter);
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


    [HttpPost("UpdateApp")]
    public async Task<IActionResult> UpdateApp([FromForm] EvaPersonalDev model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            if (model.SecondManagerId == user.EmployeeId)
                return BadRequest("Please select correct second manager");

            var parameter = new DynamicParameters();
            parameter.Add("@EvaPersonalDevId", model.EvaPersonalDevId);
            parameter.Add("@EvaluationId", model.EvaluationId);
            parameter.Add("@ManagerCommentDev", model.ManagerCommentDev);
            parameter.Add("@SecondManagerId", model.SecondManagerId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("UrEvaPersonalDevUpdateApp", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Already exists")
                return BadRequest(message);

            if (string.IsNullOrWhiteSpace(message) == false)
            {
                try
                {

                    var tmp = await _mailSender.SendEmailWithBody(
                        message,
                        "",
                        SD.BccEmail,

                        SD.EvaluationSecondReview,
                        "Dear Manager, new evaluation submitted for your kind review at MyUmoja. Please check.");

                    //await _emailSender.SendEmailAsync(
                    //    "hr@umojamicrofinance.com, " + message,
                    //    "Evaluation submited for second review",
                    //    "Dear Manager, new evaluation submitted for your kind review at MyUmoja. Pleaase check.");
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
