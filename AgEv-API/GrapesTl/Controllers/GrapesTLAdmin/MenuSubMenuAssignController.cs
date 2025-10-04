namespace GrapesTl.Controllers;

[Authorize(Roles = "Grapes Admin")]
[Route("api/[controller]")]
[ApiController]
public class MenuSubMenuAssignController(IUnitOfWork unitOfWork) : ControllerBase
{

    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    [HttpPost("process")]
    public async Task<IActionResult> Process()
    {

        try
        {
            await _unitOfWork.SP_Call.Execute("AdUserMenuSubMenuProcess");

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

}
