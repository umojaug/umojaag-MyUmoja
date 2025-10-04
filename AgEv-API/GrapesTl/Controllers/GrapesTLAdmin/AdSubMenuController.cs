namespace GrapesTl.Controllers;

[Authorize(Roles = "Grapes Admin")]
[Route("api/[controller]")]
[ApiController]
public class AdSubMenuController(IUnitOfWork unitOfWork) : ControllerBase
{

    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    [HttpGet("list")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AdSubMenuView>("AdSubMenuGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("select")]
    public async Task<IActionResult> RoleSelect()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AdSubMenuView>("AdSubMenuGetAll");
            return Ok(data.Select(a => new { listId = a.SubMenuId, listName = a.ModuleName + " - " + a.MenuName + " - " + a.SubMenuName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpGet("details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@SubMenuId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AdSubMenu>("AdSubMenuGetById", parameter);

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




    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] AdSubMenu model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();

            parameter.Add("@MenuId", model.MenuId);
            parameter.Add("@SubMenuName", model.SubMenuName);
            parameter.Add("@Icon", model.Icon);
            parameter.Add("@IconMobile", model.IconMobile);
            parameter.Add("@Link", model.Link);
            parameter.Add("@Priority", model.Priority);
            parameter.Add("@Section", model.Section);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AdSubMenuCreate", parameter);

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

    [HttpPost("update")]
    public async Task<IActionResult> Update([FromBody] AdSubMenu model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@SubMenuId", model.SubMenuId);
            parameter.Add("@MenuId", model.MenuId);
            parameter.Add("@SubMenuName", model.SubMenuName);
            parameter.Add("@Icon", model.Icon);
            parameter.Add("@IconMobile", model.IconMobile);
            parameter.Add("@Link", model.Link);
            parameter.Add("@Priority", model.Priority);
            parameter.Add("@Section", model.Section);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AdSubMenuUpdate", parameter);
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



    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@SubMenuId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AdSubMenuDelete", parameter);

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
