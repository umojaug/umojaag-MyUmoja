namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,Grapes Admin")]
[Route("api/[controller]")]
[ApiController]
public class UserController(IUnitOfWork unitOfWork, IAuthService authService, UserManager<ApplicationUser> userManager) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IAuthService _authService = authService;
    private readonly UserManager<ApplicationUser> _userManager = userManager;

    [HttpGet("list")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<User>("adUserGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("role")]
    public async Task<IActionResult> Role()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<Role>("adRoleGetAll");
            return Ok(data.Select(a => new { listId = a.Name, listName = a.Name }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("details/{userId}")]
    public async Task<IActionResult> Details(string userId)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@UserId", userId);

            var data = await _unitOfWork.SP_Call.OneRecord<User>("adUserGetById", parameter);

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

    [HttpPost("createAll")]
    public async Task<IActionResult> CreateAll()
    {
        try
        {
            var parameter = new DynamicParameters();

            var data = await _unitOfWork.SP_Call.List<EmployeeGetAll>("adUserGetRest", parameter);

            bool finish = false;
            RegisterUser model = new();
            foreach (var item in data)
            {
                model.FullName = item.EmployeeName;
                model.PhoneNumber = item.ContactNumber.Trim();
                model.Password = SD.Password;
                model.EmployeeId = item.EmployeeId;
                model.ImageUrl = item.ImageUrl;
                model.Role = item.Role;
                model.Email = item.Email;
                var result = await _authService.RegisterUserAsync(model);
                finish = result.IsSuccess;
            }

            await _unitOfWork.SP_Call.Execute("AdUserMenuSubMenuProcess", parameter);

            if (finish)
                return Created("", SD.Message_Save);

            return BadRequest("Process already finish.");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [HttpPost("update")]
    public async Task<IActionResult> Update([FromBody] User model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@UserId", model.Id);
            parameter.Add("@Role", model.Role);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("adUserUpdate", parameter);
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

    [HttpDelete("delete/{userId}")]
    public async Task<IActionResult> Delete(string userId)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@userId", userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("adUserDelete", parameter);

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

    [HttpDelete("reset/{userId}")]
    public async Task<IActionResult> Reset(string userId)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound(SD.Message_NotFound);

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            //var decodedToken = WebEncoders.Base64UrlDecode(model.UserId);
            //string normalToken = Encoding.UTF8.GetString(decodedToken);

            var result = await _userManager.ResetPasswordAsync(user, token, SD.Password);
            if (result.Succeeded)
                return NoContent();

            return BadRequest(SD.Message_Unsuccessful);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [HttpPost("lookupByPin")]
    public async Task<IActionResult> LookupByPin(LookupBy lookupBy)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeePin", lookupBy.EmployeePin);
            var data = await _unitOfWork.SP_Call.OneRecord<EmployeeDto>("hrEmployeeGetByPin", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }
}
