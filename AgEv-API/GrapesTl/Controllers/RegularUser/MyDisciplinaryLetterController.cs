namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class MyDisciplinaryLetterController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;



    [HttpGet("List")]
    public async Task<IActionResult> List()
    {

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<EmpDisciplinaryLetterView>("hrEmpDisciplinaryLetterGetByUser", parameter);

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
            parameter.Add("@DisciplinaryLetterId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<EmpDisciplinaryLetterView>("hrEmpDisciplinaryLetterGetById", parameter);

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
}
