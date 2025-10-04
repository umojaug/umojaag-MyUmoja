namespace GrapesTl.Controllers;

[Authorize(Roles = "Grapes Admin")]
[Route("api/[controller]")]
[ApiController]
public class MonthPreviousController(IUnitOfWork unitOfWork) : ControllerBase
{

    private readonly IUnitOfWork _unitOfWork = unitOfWork;



    [HttpPost("monthPrevious")]
    public async Task<IActionResult> MonthPrevious()
    {

        try
        {
            await _unitOfWork.SP_Call.Execute("hrMonthPreviousProcess");

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

}
