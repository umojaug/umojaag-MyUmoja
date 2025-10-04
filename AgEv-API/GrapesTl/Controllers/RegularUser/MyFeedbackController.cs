namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class MyFeedbackController(IUnitOfWork unitOfWork, IMailSender mailSender, ILogger<EmployeesController> logger) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<EmployeesController> _logger = logger;
    private string _userId;



    [Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
    [HttpGet("List/{feedbacktype}")]
    public async Task<IActionResult> List(string FeedbackType)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FeedbackType", FeedbackType);

            var data = await _unitOfWork.SP_Call.List<FeedbackView>("hrFeedbackGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    //[Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FeedbackId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<FeedbackView>("hrFeedbackGetById", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("MyList")]
    public async Task<IActionResult> MyList()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<FeedbackView>("hrFeedbackGetAllMy", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }



    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] Feedback model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@FeedbackType", model.FeedbackType);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@Particulars", model.Particulars);
            parameter.Add("@Category", model.Category);
            parameter.Add("@AllowAnonymous", model.AllowAnonymous);
            parameter.Add("@EmployeeId", user.EmployeeId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrFeedbackCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (string.IsNullOrWhiteSpace(message) == false)
            {
                try
                {


                    var tmp = await _mailSender.SendEmailWithBody(
                        SD.BccEmail,
                        "",
                        "",

                        model.FeedbackType + " send by " + user.FullName,
                        message);
                    //await _emailSender.SendEmailAsync(
                    //    "hr@umojamicrofinance.com",
                    //    //"surzo4368@yahoo.com",
                    //    model.FeedbackType + " send by " + user.FullName,
                    //    message);
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
            parameter.Add("@FeedbackId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrFeedbackDelete", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
             "Error deleting data." + e.Message);
        }
    }



    [HttpDelete("Status/{id}")]
    public async Task<IActionResult> StatusToggle(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FeedbackId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrFeedbackStatus", parameter);

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


    [HttpGet("MyAssignList")]
    public async Task<IActionResult> MyAssignList()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<FeedbackView>("hrFeedbackGetAllAssign", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

}
