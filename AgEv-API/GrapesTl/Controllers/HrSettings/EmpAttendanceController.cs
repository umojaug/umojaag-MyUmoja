namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,HR Manager,HR Executive,Accounts Manager,Accounts Executive, Country Team Lead")]
[Route("api/[controller]")]
[ApiController]
public class EmpAttendanceController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;


    [HttpGet("Search/{id}")]
    public async Task<IActionResult> Search(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Search", id);

            var data = await _unitOfWork.SP_Call.List<EmpAttendanceView>("hrEmpAttendanceGetBySearch", parameter);

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

    [HttpGet("Date/{fromDate}/{tillDate}")]
    public async Task<IActionResult> New([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<EmpAttendanceView>("hrEmpAttendanceGetByDate", parameter);

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


    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] EmpAttendance model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeePinName", model.PinName);
            parameter.Add("@AttenStatus", model.AttenStatus);
            parameter.Add("@Particulars", model.Particulars);
            parameter.Add("@FromDate", model.FromDate);
            parameter.Add("@TillDate", model.TillDate);
            parameter.Add("@EntryBy", user.FullName);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmpAttendanceCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

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
            parameter.Add("@EmpAttendanceId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmpAttendanceDelete", parameter);

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
