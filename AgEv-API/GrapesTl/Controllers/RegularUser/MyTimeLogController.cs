using GrapesTl.Models.HrSettings;

namespace GrapesTl.Controllers;

//[Authorize]
[Route("api/[controller]")]
[ApiController]
public class MyTimeLogController(IUnitOfWork unitOfWork) : ControllerBase
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

            var data = await _unitOfWork.SP_Call.List<EmpTimeLog>("HrEmpTimeLogGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Select")]
    public async Task<IActionResult> Select()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("hrEmployeeMgtSelect", parameter);
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpGet("MyList/{fromDate}/{tillDate}")]
    public async Task<IActionResult> MyList([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<EmpTimeLog>("HrEmpTimeLogGetAllMyList", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpGet("View/{id}")]
    public async Task<IActionResult> View(string id)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@TimeLogId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<EmpTimeLog>("HrEmpTimeLogViewGetById", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@TimeLogId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<EmpTimeLog>("hrEmpTimeLogById", parameter);

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
    public async Task<IActionResult> Create([FromForm] EmpTimeLog model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();

            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@TaskHour", model.TaskHour);
            parameter.Add("@TaskName", model.TaskName);
            parameter.Add("@TaskDate", model.TaskDate);
            parameter.Add("@AuthorityPinName", model.PinName);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrEmpTimeLogCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Select correct person for approval")
                return NotFound(message);

            if (string.IsNullOrWhiteSpace(message) == false)
            {
                //try
                //{

                //    var tmp = await _mailSender.SendEmailWithBody(
                //        message,
                //        "",
                //        SD.BccEmail,

                //        "Time Log Application by " + user.FullName,
                //        $"{user.FullName} apply for Advance Salary. Needed The salary of date {model.NeededAdvanceDate:dd/MMM/yyyy} ");

                //    //await _emailSender.SendEmailAsync(
                //    //    message,
                //    //    "Leave Application by " + user.FullName,
                //    //    $"{user.FullName} apply for Advance Salay. Needed The salary of date {model.NeededAdvanceDate:dd/MMM/yyyy} ");
                //}
                //catch (Exception ex)
                //{
                //    _logger.LogInformation("Remote work Error at: {ex}", ex.Message);
                //}
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
    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromForm] EmpTimeLog model)
    {

        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@TimeLogId", model.TimeLogId);
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@AuthorityPinName", model.PinName);
            parameter.Add("@TaskName", model.TaskName);
            parameter.Add("@TaskHour", model.TaskHour);
            //parameter.Add("@Status", model.Status);
            parameter.Add("@TaskDate", model.TaskDate);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrEmpTimeLogUpdate", parameter);
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
            parameter.Add("@TimeLogId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrEmpTimeLogDelete", parameter);

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
