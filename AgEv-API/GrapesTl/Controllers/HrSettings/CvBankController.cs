namespace GrapesTl.Controllers;


[Route("api/[controller]")]
[ApiController]
public class CvBankController(IUnitOfWork unitOfWork, IMailSender mailSender, IConfiguration configuration, ILogger<EmpResignController> logger, IFileUploadService fileUploadService) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly IConfiguration _configuration = configuration;
    private readonly ILogger<EmpResignController> _logger = logger;
    private readonly IFileUploadService _fileUploadService = fileUploadService;

    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] CvBanK model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {

            var fileUrl = "";
            if (model.File is not null && model.File.Length > 0)
                fileUrl = await _fileUploadService.GetUploadUrlAsync(model.File);

            var parameter = new DynamicParameters();
            parameter.Add("@FullName", model.FullName);
            parameter.Add("@Email", model.Email);
            parameter.Add("@CompanyId", model.CompanyId);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@JobType", model.JobType);
            parameter.Add("@FileUrl", fileUrl);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            //parameter.Add("@Email", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrCvBankCreate", parameter);

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
                        $"Thank you for submitting your information. We will review your CV and get in touch with you shortly.");


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


    [Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<CvBanKView>("HrCvBankGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


}
