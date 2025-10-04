namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class FeedbackAssignController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;



    [Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
    [HttpGet("List/{noteId}")]
    public async Task<IActionResult> List(string noteId)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@NoteId", noteId);

            var data = await _unitOfWork.SP_Call.List<FeedbackAssignView>("FeedbackAssignGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    //[HttpGet("Select")]
    //public async Task<IActionResult> Select()
    //{
    //    try
    //    {
    //        var data = await _unitOfWork.SP_Call.List<FeedbackAssign>("hrDepartmentGetAll");
    //        return Ok(data.Select(a => new { listId = a.DepartmentId, listName = a.DepartmentName }));
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //       "Error retrieve list of data." + e.Message);
    //    }
    //}

    //[Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
    //[HttpGet("Details/{id}")]
    //public async Task<IActionResult> Details(string id)
    //{
    //    try
    //    {
    //        var parameter = new DynamicParameters();
    //        parameter.Add("@DepartmentId", id);

    //        var data = await _unitOfWork.SP_Call.OneRecord<FeedbackAssignView>("hrDepartmentGetById", parameter);

    //        if (data == null)
    //            return NotFound(SD.Message_NotFound);

    //        return Ok(data);
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //       "Error retrieve details data." + e.Message);
    //    }
    //}

    [Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] FeedbackAssign model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@NoteId", model.NoteId);
            parameter.Add("@AUTHORITYPINNAME", model.PinName);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("FeedbackAssignCreate", parameter);

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

    //[Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
    //[HttpPost("Update")]
    //public async Task<IActionResult> Update([FromBody] FeedbackAssign model)
    //{
    //    if (!ModelState.IsValid)
    //        return BadRequest(SD.Message_Model_Error);

    //    try
    //    {
    //        var parameter = new DynamicParameters();
    //        parameter.Add("@AssignId", model.AssignId);
    //        parameter.Add("@FeedbackId", model.FeedbackId);
    //        parameter.Add("@EmployeeId", model.EmployeeId);

    //        parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
    //        await _unitOfWork.SP_Call.Execute("hrDepartmentUpdate", parameter);
    //        var message = parameter.Get<string>("Message");

    //        if (message == "Not found")
    //            return NotFound(message);

    //        if (message == "Already exists")
    //            return BadRequest(message);

    //        return NoContent();
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //       "Error updating data." + e.Message);
    //    }
    //}

    [Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AssignId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("FeedbackAssignDelete", parameter);

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
