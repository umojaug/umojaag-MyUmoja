namespace GrapesTl.Controllers;


[Route("api/[controller]")]
[ApiController]
public class RiskRegisterDetailsController(IUnitOfWork unitOfWork, IFileUploadService fileUploadService) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;
    private readonly IFileUploadService _fileUploadService = fileUploadService;


    [HttpGet("list/{id}")]
    public async Task<IActionResult> List(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@RiskRegisterId", id);

            var data = await _unitOfWork.SP_Call.List<RiskRegisterDetailsView>("opsRiskRegisterDetailsGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }



    [HttpGet("ownList/{id}")]
    public async Task<IActionResult> OwnList(string id)
    {
        try
        {

            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@RiskRegisterId", id);

            var data = await _unitOfWork.SP_Call.List<RiskRegisterDetailsView>("opsRiskRegisterDetailsGetAllOwn", parameter);

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
            parameter.Add("@RiskRegisterDetailsId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<RiskRegisterDetailsView>("OpsRiskRegisterDetailsGetById", parameter);

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






    [HttpPost("update")]
    public async Task<IActionResult> Update([FromForm] RiskRegisterDetailsUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {

            var fileUrl = "";
            if (model.File is not null && model.File.Length > 0)
                fileUrl = await _fileUploadService.GetUploadUrlAsync(model.File);

            var parameter = new DynamicParameters();
            parameter.Add("@RiskRegisterDetailsId", model.RiskRegisterDetailsId);
            parameter.Add("@LikelihoodRating", model.LikelihoodRating);
            parameter.Add("@ConsequenceRating", model.ConsequenceRating);
            parameter.Add("@OverallRating", model.OverallRating);
            parameter.Add("@RiskRatingLevel", model.RiskRatingLevel);
            parameter.Add("@Comment", model.Comment);
            parameter.Add("@MitigationPlan", model.MitigationPlan);
            parameter.Add("@Timeline", model.Timeline);
            parameter.Add("@Attachment", fileUrl);
            // parameter.Add("@RiskOfficer", model.RiskOfficer);
            // parameter.Add("@RiskParameterCheck", model.RiskParameterCheck);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("opsRiskRegisterDetailsUpdate", parameter);
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



    [HttpPost("updateRiskParameter")]
    public async Task<IActionResult> UpdateRiskParameter([FromForm] RiskRegisterDetailsUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {

            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();

            parameter.Add("@RiskRegisterDetailsId", model.RiskRegisterDetailsId);
            parameter.Add("@RiskParameterCheck", model.RiskParameterCheck);
            parameter.Add("@EmployeeId", user.EmployeeId);



            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("opsRiskRegisterParameterUpdate", parameter);
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


    [HttpPost("submitted/{id}")]
    public async Task<IActionResult> Submitted(string id)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {

            //var fileUrl = "";
            //if (model.File is not null && model.File.Length > 0)
            //    fileUrl = await _fileUploadService.GetUploadUrlAsync(model.File);

            var parameter = new DynamicParameters();
            parameter.Add("@RiskRegisterId", id);
            //parameter.Add("@LikelihoodRating", model.LikelihoodRating);
            //parameter.Add("@ConsequenceRating", model.ConsequenceRating);
            //parameter.Add("@OverallRating", model.OverallRating);
            //parameter.Add("@RiskRatingLevel", model.RiskRatingLevel);
            //parameter.Add("@Comment", model.Comment);
            //parameter.Add("@MitigationPlan", model.MitigationPlan);
            //parameter.Add("@Timeline", model.Timeline);
            //parameter.Add("@Attachment", fileUrl);
            //// parameter.Add("@RiskOfficer", model.RiskOfficer);
            //// parameter.Add("@RiskParameterCheck", model.RiskParameterCheck);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("opsRiskRegisterSubmitted", parameter);
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
