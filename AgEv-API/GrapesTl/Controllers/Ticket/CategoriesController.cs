namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class CategoriesController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    //[HttpGet("List")]
    //public async Task<IActionResult> List()
    //{
    //    try
    //    {
    //        var data = await _unitOfWork.SP_Call.List<TicketCategory>("fixCategoryGetAll");

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
            var data = await _unitOfWork.SP_Call.List<TicketCategory>("fixCategoryGetAll");
            return Ok(data.Select(a => new { listId = a.CategoryId, listName = a.CategoryName }));
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
    //        parameter.Add("@CategoryId", id);

    //        var data = await _unitOfWork.SP_Call.OneRecord<Category>("fixCategoryGetById", parameter);

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
    //public async Task<IActionResult> Create([FromBody] Category model)
    //{
    //    if (!ModelState.IsValid)
    //        return BadRequest(SD.Message_Model_Error);

    //    try
    //    {
    //        var parameter = new DynamicParameters();
    //        parameter.Add("@CategoryName", model.CategoryName);

    //        parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
    //        await _unitOfWork.SP_Call.Execute("fixCategoryCreate", parameter);

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
    //public async Task<IActionResult> Update([FromBody] Category model)
    //{
    //    if (!ModelState.IsValid)
    //        return BadRequest(SD.Message_Model_Error);

    //    try
    //    {
    //        var parameter = new DynamicParameters();
    //        parameter.Add("@CategoryId", model.CategoryId);
    //        parameter.Add("@CategoryName", model.CategoryName);

    //        parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
    //        await _unitOfWork.SP_Call.Execute("fixCategoryUpdate", parameter);
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
    //        parameter.Add("@CategoryId", id);

    //        parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
    //        await _unitOfWork.SP_Call.Execute("fixCategoryDelete", parameter);

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
