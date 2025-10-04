namespace GrapesTl.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MyResignController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;


    [HttpPost("Update")]
    public async Task<IActionResult> Create([FromBody] EmpInterview model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", model.EmployeeId);
            parameter.Add("@BetterOffer", model.BetterOffer);
            parameter.Add("@SalaryPackage", model.SalaryPackage);
            parameter.Add("@FamilyNeed", model.FamilyNeed);
            parameter.Add("@TypeOfWork", model.TypeOfWork);
            parameter.Add("@CareerPath", model.CareerPath);
            parameter.Add("@Disability", model.Disability);
            parameter.Add("@Supervisor", model.Supervisor);
            parameter.Add("@Relocation", model.Relocation);
            parameter.Add("@Colleagues", model.Colleagues);
            parameter.Add("@Travel", model.Travel);
            parameter.Add("@WorkingConditions", model.WorkingConditions);
            parameter.Add("@Education", model.Education);
            parameter.Add("@Benefits", model.Benefits);
            parameter.Add("@OtherReason", model.OtherReason);
            parameter.Add("@InformSupervisor", model.InformSupervisor);
            parameter.Add("@Feedback", model.Feedback);
            parameter.Add("@Resources", model.Resources);
            parameter.Add("@Growth", model.Growth);
            parameter.Add("@Payment", model.Payment);
            parameter.Add("@Recognized", model.Recognized);
            parameter.Add("@Decisions", model.Decisions);
            parameter.Add("@Voicing", model.Voicing);
            parameter.Add("@Treat", model.Treat);
            parameter.Add("@coworkers", model.coworkers);
            parameter.Add("@teamMembers", model.teamMembers);
            parameter.Add("@stressed", model.stressed);
            parameter.Add("@WorkBalance", model.WorkBalance);
            parameter.Add("@SafePlace", model.SafePlace);
            parameter.Add("@Environment", model.Environment);
            parameter.Add("@RecommendUs", model.RecommendUs);
            parameter.Add("@Comments", model.Comments);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmpInterviewUpdate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }
}
