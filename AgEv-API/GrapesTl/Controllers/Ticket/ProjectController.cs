namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ProjectController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    //[HttpGet("List")]
    //public async Task<IActionResult> List()
    //{
    //    try
    //    {
    //        var data = await _unitOfWork.SP_Call.List<TicketProject>("fixProjectGetAll");

    //        return Ok(data);
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //       "Error retrieve list of data." + e.Message);
    //    }
    //}

    [HttpGet("select")]
    public async Task<IActionResult> Select()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<TicketProject>("fixProjectGetAll");
            return Ok(data.Select(a => new { listId = a.ProjectId, listName = a.ProjectName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    //[HttpGet("Details/{id}")]
    //public async Task<IActionResult> Details(string id)
    //{
    //    try
    //    {
    //        var parameter = new DynamicParameters();
    //        parameter.Add("@ProjectId", id);

    //        var data = await _unitOfWork.SP_Call.OneRecord<Project>("fixProjectGetById", parameter);

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

    //[HttpPost("Create")]
    //public async Task<IActionResult> Create([FromBody] Project model)
    //{
    //    if (!ModelState.IsValid)
    //        return BadRequest(SD.Message_Model_Error);

    //    try
    //    {
    //        var parameter = new DynamicParameters();
    //        parameter.Add("@ProjectName", model.ProjectName);

    //        parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
    //        await _unitOfWork.SP_Call.Execute("fixProjectCreate", parameter);

    //        var message = parameter.Get<string>("Message");

    //        if (message == "Already exists")
    //            return BadRequest(message);

    //        return Created("", SD.Message_Save);
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //       "Error saving data." + e.Message);
    //    }
    //}

    //[HttpPost("Update")]
    //public async Task<IActionResult> Update([FromBody] Project model)
    //{
    //    if (!ModelState.IsValid)
    //        return BadRequest(SD.Message_Model_Error);

    //    try
    //    {
    //        var parameter = new DynamicParameters();
    //        parameter.Add("@ProjectId", model.ProjectId);
    //        parameter.Add("@ProjectName", model.ProjectName);

    //        parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
    //        await _unitOfWork.SP_Call.Execute("fixProjectUpdate", parameter);
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

    //[HttpDelete("Delete/{id}")]
    //public async Task<IActionResult> Delete(string id)
    //{
    //    try
    //    {
    //        var parameter = new DynamicParameters();
    //        parameter.Add("@ProjectId", id);

    //        parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
    //        await _unitOfWork.SP_Call.Execute("fixProjectDelete", parameter);

    //        var message = parameter.Get<string>("Message");

    //        if (message == "Not found")
    //            return NotFound(message);

    //        if (message == "Cannot delete")
    //            return BadRequest(message);

    //        return NoContent();
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //         "Error deleting data." + e.Message);
    //    }
    //}

}
