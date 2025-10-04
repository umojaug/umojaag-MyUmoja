namespace GrapesTl.Controllers;


[Authorize(Roles = "Grapes Admin,Super Admin")]
[Route("api/[controller]")]
[ApiController]
public class UserCreateController(IUnitOfWork unitOfWork, IAuthService authService, IFileUploadService fileUploadService) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IAuthService _authService = authService;
    private readonly IFileUploadService _fileUploadService = fileUploadService;


    [HttpGet("list")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<User>("CaUserGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("select")]
    public async Task<IActionResult> Select()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<UserSelect>("CaUserGetAllForSelect");
            return Ok(data.Select(a => new { listId = a.UserId, listName = a.Role + " - " + a.FullName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("roleSelect")]
    public async Task<IActionResult> RoleSelect()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<Role>("CaRoleelectGetAll");
            return Ok(data.Select(a => new { listId = a.Name, listName = a.Name }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromForm] UserCreate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        var fileId = "";
        if (model.File is not null && model.File.Length > 0)
            fileId = await _fileUploadService.GetUploadIdAsync(model.File);

        var userModel = new RegisterUser
        {

            FullName = model.FullName,
            PhoneNumber = model.PhoneNumber,
            ImageUrl = fileId,
            Password = SD.Password,
            EmployeeId = model.PhoneNumber,
            Role = model.Role
        };
        var result = await _authService.RegisterUserAsync(userModel);

        if (result.IsSuccess)
            return Created("", SD.Message_Save);

        return BadRequest(SD.Message_Unsuccessful);
    }
}
