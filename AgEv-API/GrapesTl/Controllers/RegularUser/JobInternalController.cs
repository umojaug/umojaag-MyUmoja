namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class JobInternalController(IUnitOfWork unitOfWork, IFileUploadService fileUploadService, IMailSender mailSender, ILogger<EmpResignController> logger) : ControllerBase
{

    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<EmpResignController> _logger = logger;
    private readonly IFileUploadService _fileUploadService = fileUploadService;




    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<JobView>("hrJobGetAllInternal");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }




}
