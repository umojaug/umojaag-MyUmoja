namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class FeedbackController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;



    [Authorize(Roles = "Super Admin,HR Manager,HR Executive")]
    [HttpGet("List/{feedbacktype}")]
    public async Task<IActionResult> List(string FeedbackType)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FeedbackType", FeedbackType);

            var data = await _unitOfWork.SP_Call.List<FeedbackView>("FeedbackGetAll", parameter);

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
            parameter.Add("@FeedbackId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<FeedbackView>("FeedbackGetById", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("DetailsWithNote/{id}")]
    public async Task<IActionResult> DetailsWithNote(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FeedbackId", id);

            var item = await _unitOfWork.SP_Call.OneRecord<FeedbackView>("FeedbackGetById", parameter);
            var list = await _unitOfWork.SP_Call.List<FeedbackNoteView>("FeedbackNoteGetById", parameter);

            var data = new { feedback = item, notes = list };
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpDelete("Status/{id}")]
    public async Task<IActionResult> StatusToggle(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FeedbackId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrFeedbackStatus", parameter);

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
