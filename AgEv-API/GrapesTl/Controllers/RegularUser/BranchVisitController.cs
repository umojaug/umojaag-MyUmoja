using GrapesTl.Models.Fix;

namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class BranchVisitController(IUnitOfWork unitOfWork) : ControllerBase
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

            var data = await _unitOfWork.SP_Call.List<BranchVisitView>("HrBranchVisitGetAll",parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }



    [HttpGet("pendingList")]
    public async Task<IActionResult> PendingList()
    {
        try
        {

            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<BranchVisitView>("HrBranchVisitGetAllPending", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpGet("approvelist")]
    public async Task<IActionResult> Approvelist()
    {
        try
        {

            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<BranchVisitView>("HrBranchVisitGetAllApprove", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }



    [HttpPost("approve/{id}")]
    public async Task<IActionResult> Approve(string id)
    {
        if (!ModelState.IsValid)
            return BadRequest("Invalid request data.");

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();

            parameter.Add("@BranchVisitId", id);
            parameter.Add("@UserId", user.Id);
            // parameter.Add("@Remarks", model.Remarks);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

            await _unitOfWork.SP_Call.Execute("HrBranchVisitApprove", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, "Error updating status. " + e.Message);
        }
    }



    [HttpPost("reject/{id}")]
    public async Task<IActionResult> Reject(string id, [FromForm] TicketView model)
    {
        if (!ModelState.IsValid)
            return BadRequest("Invalid request data.");

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();

            parameter.Add("@BranchVisitId", id);
            parameter.Add("@Remarks", model.Remarks);
            //parameter.Add("@ClosedBy", user.FullName);
            parameter.Add("@UserId", user.Id);



            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

            await _unitOfWork.SP_Call.Execute("HrBranchVisitReject", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, "Error updating status. " + e.Message);
        }
    }




    //[HttpGet("Select")]
    //public async Task<IActionResult> Select()
    //{
    //    try
    //    {
    //        var data = await _unitOfWork.SP_Call.List<BranchVisitView>("HrBranchVisitGetAll");
    //        return Ok(data.Select(a => new { listId = a.DepartmentId, listName = a.DepartmentName }));
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //       "Error retrieve list of data." + e.Message);
    //    }
    //}

    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@BranchVisitId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<BranchVisit>("HrBranchVisitGetById", parameter);

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
    public async Task<IActionResult> Create([FromBody] BranchVisit model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            //parameter.Add("@BranchVisitId", model.BranchVisitId);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@VisitDate", model.VisitDate);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrBranchVisitCreate", parameter);

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
    public async Task<IActionResult> Update([FromBody] BranchVisit model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@BranchVisitId", model.BranchVisitId);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@VisitDate", model.VisitDate);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrBranchVisitUpdate", parameter);
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
            parameter.Add("@BranchVisitId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrBranchVisitDelete", parameter);

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
