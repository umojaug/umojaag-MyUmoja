namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class TrainingEvaluationController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;


    [HttpGet("List/{query}")]
    public async Task<IActionResult> List(string query)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@query", query);

            var data = await _unitOfWork.SP_Call.List<TrainingEvaluationView>("HrTraningEvaluationGetAll", parameter);

            return Ok(data);
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
            parameter.Add("@EvaluationId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<TrainingEvaluationView>("HrTraningEvaluationGetById", parameter);

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

    [Authorize]
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] TrainingEvaluation model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@TopicId", model.TopicId);
            parameter.Add("@SatisfiedWithOverAllTrainingSession", model.SatisfiedWithOverAllTrainingSession);
            parameter.Add("@RelevantTrainingContentToYourJob", model.RelevantTrainingContentToYourJob);
            parameter.Add("@EffectiveTrainerInDeliveringTheContent", model.EffectiveTrainerInDeliveringTheContent);
            parameter.Add("@UsefulTrainingMaterialsProvided", model.UsefulTrainingMaterialsProvided);
            parameter.Add("@EngagingTrainingSession", model.EngagingTrainingSession);
            parameter.Add("@LikelyApplyLearnedJob", model.LikelyApplyLearnedJob);
            parameter.Add("@DidYouLikeMostAboutTheTrainingSession", model.DidYouLikeMostAboutTheTrainingSession);
            parameter.Add("@CouldImprovedFutureTrainingSessions", model.CouldImprovedFutureTrainingSessions);
            parameter.Add("@AnyAdditionalCommentsOrSuggestions", model.AnyAdditionalCommentsOrSuggestions);
            parameter.Add("@TrainingContent", model.TrainingContent);
            parameter.Add("@TrainersKnowledge", model.TrainersKnowledge);
            parameter.Add("@TrainingEnvironment", model.TrainingEnvironment);
            parameter.Add("@OverallExperience", model.OverallExperience);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("HrTrainingEvaluationCreate", parameter);
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
