namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AuditTestStepsController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;



    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AuditTestStepsView>("AuditTestStepsGetAll");

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
            var data = await _unitOfWork.SP_Call.List<AuditTestSteps>("AuditTestStepsGetAll");
            return Ok(data.Select(a => new { listId = a.AuditTestStepsId, listName = a.TestStepsName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AuditTestStepsId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AuditTestSteps>("AuditTestStepsGetById", parameter);

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

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] AuditTestSteps model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var parameter = new DynamicParameters();
            parameter.Add("@AuditAreaId", model.AuditAreaId);
            parameter.Add("@TestStepsName", model.TestStepsName);
            //parameter.Add("@Details", OperationConstant.AudiTestStepsCreate);
            //parameter.Add("@OperationBy", userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditTestStepsCreate", parameter);

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

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromBody] AuditTestSteps model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var parameter = new DynamicParameters();
            parameter.Add("@AuditTestStepsId", model.AuditTestStepsId);
            parameter.Add("@AuditAreaId", model.AuditAreaId);
            parameter.Add("@TestStepsName", model.TestStepsName);
            //parameter.Add("@Details", OperationConstant.AudiTestStepsUpdate);
            //parameter.Add("@OperationBy", userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditTestStepsUpdate", parameter);
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

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var parameter = new DynamicParameters();
            parameter.Add("@AuditTestStepsId", id);
            //parameter.Add("@Details", OperationConstant.AudiTestStepsDelete);
            //parameter.Add("@OperationBy", userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditTestStepsDelete", parameter);

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
