namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
[Route("api/[controller]")]
[ApiController]
public class ShiftsController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;


    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<Shift>("hrShiftGetAll");

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
            var data = await _unitOfWork.SP_Call.List<Shift>("hrShiftGetAll");
            return Ok(data.Select(a => new { listId = a.ShiftId, listName = a.ShiftName }));
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
            parameter.Add("@ShiftId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<Shift>("hrShiftGetById", parameter);

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
    public async Task<IActionResult> Create([FromBody] Shift model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@ShiftName", model.ShiftName);
            parameter.Add("@ShiftIn", model.ShiftIn);
            parameter.Add("@ShiftOut", model.ShiftOut);
            parameter.Add("@ShiftAbsent", model.ShiftAbsent);
            parameter.Add("@ShiftLate", model.ShiftLate);
            parameter.Add("@ShiftEarly", model.ShiftEarly);
            parameter.Add("@ShiftLunchFrom", model.ShiftLunchFrom);
            parameter.Add("@ShiftLunchTill", model.ShiftLunchTill);
            parameter.Add("@ShiftLastPunch", model.ShiftLastPunch);
            parameter.Add("@DefaultShift", model.DefaultShift);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrShiftCreate", parameter);

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
    public async Task<IActionResult> Update([FromBody] Shift model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@ShiftId", model.ShiftId);
            parameter.Add("@ShiftName", model.ShiftName);
            parameter.Add("@ShiftIn", model.ShiftIn.ToString("hh:mm tt"));
            parameter.Add("@ShiftOut", model.ShiftOut.ToString("hh:mm tt"));
            parameter.Add("@ShiftAbsent", model.ShiftAbsent.ToString("hh:mm tt"));
            parameter.Add("@ShiftLate", model.ShiftLate.ToString("hh:mm tt"));
            parameter.Add("@ShiftEarly", model.ShiftEarly.ToString("hh:mm tt"));
            parameter.Add("@ShiftLunchFrom", model.ShiftLunchFrom.ToString("hh:mm tt"));
            parameter.Add("@ShiftLunchTill", model.ShiftLunchTill.ToString("hh:mm tt"));
            parameter.Add("@ShiftLastPunch", model.ShiftLastPunch.ToString("hh:mm tt"));
            parameter.Add("@DefaultShift", model.DefaultShift);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrShiftUpdate", parameter);
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
            parameter.Add("@ShiftId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrShiftDelete", parameter);

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
