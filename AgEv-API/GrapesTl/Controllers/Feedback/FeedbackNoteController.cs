namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class FeedbackNoteController(IUnitOfWork unitOfWork, IMailSender mailSender, ILogger<EmployeesController> logger) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<EmployeesController> _logger = logger;
    private string _userId;



    [HttpGet("List/{id}")]
    public async Task<IActionResult> List(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FeedbackId", id);

            var data = await _unitOfWork.SP_Call.List<FeedbackNoteView>("FeedbackNoteGetById", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] FeedbackNote model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@FeedbackId", model.FeedbackId);
            parameter.Add("@Note", model.Note);
            parameter.Add("@AUTHORITYPINNAME", model.PinName);
            parameter.Add("@EntryBy", user.FullName);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("FeedbackNoteAssignCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not Found")
                return BadRequest(message);

            var data = await _unitOfWork.SP_Call.List<String>("FeedbackAuthorityGetAll");
            string result = String.Join(";", data);

            // Audior Email come from AuditWorkplanUpdate message 
            if (string.IsNullOrWhiteSpace(result) == false)
            {
                try
                {
                    var tmp = await _mailSender.SendEmailWithBody(
                        result,
                        "Feedback Team",
                        SD.BccEmail,
                        SD.Feedback,
                        $"Dear Concern, Someone create feedback. Please have a look.");
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


}
