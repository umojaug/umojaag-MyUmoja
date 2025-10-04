namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class MyFeedbackNoteController(IUnitOfWork unitOfWork, IMailSender mailSender, ILogger<EmployeesController> logger) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<EmployeesController> _logger = logger;
    private string _userId;





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
            parameter.Add("@EntryBy", user.FullName);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("FeedbackNoteCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not Found")
                return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

}
