namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class PendingTimeLogApplicationsController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;


    [Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
    [HttpGet("List")]
    public async Task<IActionResult> List()
    {

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@AuthorityId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<EmpTimeSummeryView>("HrEmpTimeLogGetAllPending", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }
    [Authorize]
    [HttpDelete("StatusUpdate/{id}")]
    public async Task<IActionResult> StatusUpdate(string id)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@TimeLogId", id);
            parameter.Add("@AuthorityId", user.FullName);
            //parameter.Add("@Details", OperationConstant.AuditPlaStatusUpdate);
            //parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrEmpTimeLogStatusUpdate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Cannot update status")
                return BadRequest(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
             "Error deleting data." + e.Message);
        }
    }

    [Authorize]
    [HttpDelete("RejectStatusUpdate/{id}")]
    public async Task<IActionResult> RejectStatusUpdate(string id)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@TimeLogId", id);
            parameter.Add("@AuthorityId", user.FullName);
            //parameter.Add("@Details", OperationConstant.AuditPlaStatusUpdate);
            //parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrEmpTimeLogRejectStatusUpdate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Cannot update status")
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
