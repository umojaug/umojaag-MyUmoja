namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class EmployeeInfoController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;


    [HttpGet("UserInfo")]
    public async Task<IActionResult> UserInfo()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.OneRecord<EmployeeGetById>("hrEmployeeGetUserInfoById", parameter);

            if (data == null)
                return NotFound(SD.Message_NotFound);

            return Ok(new { employeeId = data.EmployeeId, fullName = data.EmployeeName, imageUrl = data.ImageUrl });
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve details data." + e.Message);
        }
    }

    [HttpGet("UserInfoById/{id}")]
    public async Task<IActionResult> UserInfoById(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<EmployeeGetById>("hrEmployeeGetUserInfoById", parameter);

            if (data == null)
                return NotFound(SD.Message_NotFound);

            return Ok(new { fullName = data.EmployeeName, imageUrl = data.ImageUrl });
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve details data." + e.Message);
        }
    }

    [HttpGet("Details")]
    public async Task<IActionResult> Details()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var employee = await _unitOfWork.SP_Call.OneRecord<EmployeeGetViewById>("hrEmployeeGetViewById", parameter);
            if (employee == null)
                return NotFound(SD.Message_NotFound);

            var transfer = await _unitOfWork.SP_Call.List<EmpTransferView>("hrEmpTransferGetById", parameter);
            var promotion = await _unitOfWork.SP_Call.List<EmpPromotionView>("hrEmpPromotionGetById", parameter);

            return Ok(new EmployeeHistory { Employee = employee, Transfer = transfer, Promotion = promotion });
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve details data." + e.Message);
        }
    }



}
