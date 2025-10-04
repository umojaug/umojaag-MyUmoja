namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class EvaBehaviorsController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;



    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaluationId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<EvaBehaviors>("UrEvaBehaviorsGetByEvaId", parameter);

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



    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromForm] EvaBehaviors model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaBehaviorsId", model.EvaBehaviorsId);
            parameter.Add("@AmbitiousAnswer1", model.AmbitiousAnswer1);
            parameter.Add("@AmbitiousAnswer2", model.AmbitiousAnswer2);
            parameter.Add("@ConsistentAnswer1", model.ConsistentAnswer1);
            parameter.Add("@ConsistentAnswer2", model.ConsistentAnswer2);
            parameter.Add("@PositiveAnswer1", model.PositiveAnswer1);
            parameter.Add("@PositiveAnswer2", model.PositiveAnswer2);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("UrEvaBehaviorsUpdate", parameter);
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

    [HttpPost("UpdateApp")]
    public async Task<IActionResult> UpdateApp([FromForm] EvaBehaviors model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaBehaviorsId", model.EvaBehaviorsId);
            parameter.Add("@AmbitiousReply", model.AmbitiousReply);
            parameter.Add("@AmbitiousRating", model.AmbitiousRating);
            parameter.Add("@ConsistentReply", model.ConsistentReply);
            parameter.Add("@ConsistentRating", model.ConsistentRating);
            parameter.Add("@PositiveReply", model.PositiveReply);
            parameter.Add("@PositiveRating", model.PositiveRating);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("UrEvaBehaviorsUpdateApp", parameter);
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


}
