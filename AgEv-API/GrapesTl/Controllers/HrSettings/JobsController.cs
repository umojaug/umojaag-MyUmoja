namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
[Route("api/[controller]")]
[ApiController]
public class JobsController(IUnitOfWork unitOfWork, IFileUploadService fileUploadService, IMailSender mailSender, IConfiguration configuration, ILogger<EmpResignController> logger) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly IConfiguration _configuration = configuration;
    private readonly ILogger<EmpResignController> _logger = logger;
    private readonly IFileUploadService _fileUploadService = fileUploadService;

    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<JobView>("hrJobGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@JobId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<JobView>("hrJobGetById", parameter);

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


    [HttpGet("ApplyJobList")]
    public async Task<IActionResult> ApplyJobList()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<ApplyJobView>("hrJobApplyGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("ApplyJobDetails/{id}")]
    public async Task<IActionResult> ApplyJobDetails(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@JobApplyId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<ApplyJobView>("hrJobApplyGetById", parameter);

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

    [HttpPost("ApplyJobFeedback")]
    public async Task<IActionResult> ApplyJobFeedback([FromForm] ApplyJobFeedback model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {


            var parameter = new DynamicParameters();
            parameter.Add("@JobApplyId", model.JobApplyId);
            parameter.Add("@Feedback", model.Feedback);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrJobApplyFeedbackUpdate", parameter);

            var message = parameter.Get<string>("Message");


            if (message == "Already exists")
                return BadRequest(message);

            if (string.IsNullOrWhiteSpace(model.Email) == false)
            {
                try
                {
                    var tmp = await _mailSender.SendEmailWithBody(
                        model.Email,
                        "",
                        SD.BccEmail,
                        SD.ContactSubject,
                        model.Feedback
                        );
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

    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] Job model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@Title", model.Title);
            parameter.Add("@Section", model.Section);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrJobCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromBody] Job model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@JobId", model.JobId);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@Title", model.Title);
            parameter.Add("@Section", model.Section);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrJobUpdate", parameter);
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

    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@JobId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrJobDelete", parameter);

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
