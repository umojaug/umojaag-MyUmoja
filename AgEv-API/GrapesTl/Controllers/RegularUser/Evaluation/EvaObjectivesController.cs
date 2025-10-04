namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class EvaObjectivesController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;


    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaluationId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<EvaObjectives>("UrEvaObjectivesGetByEvaId", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromForm] EvaObjectives model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaObjectivesId", model.EvaObjectivesId);
            parameter.Add("@ObjectiveDetailsOne", model.ObjectiveDetailsOne);
            parameter.Add("@EmployeeCommentOne", model.EmployeeCommentOne);
            parameter.Add("@ObjectiveDetailsTwo", model.ObjectiveDetailsTwo);
            parameter.Add("@EmployeeCommentTwo", model.EmployeeCommentTwo);
            parameter.Add("@ObjectiveDetailsThree", model.ObjectiveDetailsThree);
            parameter.Add("@EmployeeCommentThree", model.EmployeeCommentThree);
            parameter.Add("@ObjectiveDetailsFour", model.ObjectiveDetailsFour);
            parameter.Add("@EmployeeCommentFour", model.EmployeeCommentFour);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("UrEvaObjectivesUpdate", parameter);
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
    public async Task<IActionResult> UpdateApp([FromForm] EvaObjectives model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaObjectivesId", model.EvaObjectivesId);
            parameter.Add("@ManagerCommentOne", model.ManagerCommentOne);
            parameter.Add("@RatingOne", model.RatingOne);
            parameter.Add("@ManagerCommentTwo", model.ManagerCommentTwo);
            parameter.Add("@RatingTwo", model.RatingTwo);
            parameter.Add("@ManagerCommentThree", model.ManagerCommentThree);
            parameter.Add("@RatingThree", model.RatingThree);
            parameter.Add("@ManagerCommentFour", model.ManagerCommentFour);
            parameter.Add("@RatingFour", model.RatingFour);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("UrEvaObjectivesUpdateApp", parameter);
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
