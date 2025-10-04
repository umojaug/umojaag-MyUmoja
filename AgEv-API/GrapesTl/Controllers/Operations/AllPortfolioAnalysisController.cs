namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AllPortfolioAnalysisController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;


    [HttpGet("List/{id}")]
    public async Task<IActionResult> List(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AllVisitId", id);
            var data = await _unitOfWork.SP_Call.List<AllPortfolioAnalysis>("OpsAllPortfolioAnalysisListGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);

        }
    }

    [HttpGet("PortfolioAnalysisList/{id}")]
    public async Task<IActionResult> PortfolioAnalysisList(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AllVisitId", id);
            var data = await _unitOfWork.SP_Call.OneRecord<AllPortfolioAnalysis>("OpsAllPortfolioAnalysisGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpGet("Select/{id}")]
    public async Task<IActionResult> Select(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AllVisitId", id);

            var data = await _unitOfWork.SP_Call.List<User>("hrLoGetForSelect", parameter);
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpGet("DetailsComments/{id}")]
    public async Task<IActionResult> DetailsComments(string id)
    {
        try
        {

            var parameter = new DynamicParameters();
            parameter.Add("@AllVisitId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AllPortfolioAnalysis>("OpsAllProtfolioAnalysisGetById", parameter);

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

    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AnalysisId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AllPortfolioAnalysis>("OpsAllPortfolioAnalysisListGetById", parameter);

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
    public async Task<IActionResult> Create([FromForm] AllPortfolioAnalysis model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@AllVisitId", model.AllVisitId);
            parameter.Add("@LoId", model.EmployeeId);
            parameter.Add("@BorrowerMicroLoan", model.BorrowerMicroLoan);
            parameter.Add("@BorrowerSbl", model.BorrowerSbl);
            parameter.Add("@BorrowerTotal", model.BorrowerTotal);
            parameter.Add("@LoiMicroLoan", model.LoiMicroLoan);
            parameter.Add("@LoiSbl", model.LoiSbl);
            parameter.Add("@LoiTotal", model.LoiTotal);
            parameter.Add("@BorrowerTarget", model.BorrowerTarget);
            parameter.Add("@ShortageNoOfBorrower", model.ShortageNoOfBorrower);
            parameter.Add("@OverdueNo", model.OverdueNo);
            parameter.Add("@OverdueAmount", model.OverdueAmount);
            parameter.Add("@OverdueInDeNo", model.OverdueInDeNo);
            parameter.Add("@OverdueInDeAmount", model.OverdueInDeAmount);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllPortfolioAnalysisCreate", parameter);

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
    public async Task<IActionResult> Update([FromForm] AllPortfolioAnalysis model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AnalysisId", model.AnalysisId);
            parameter.Add("@LoId", model.EmployeeId);
            parameter.Add("@BorrowerMicroLoan", model.BorrowerMicroLoan);
            parameter.Add("@BorrowerSbl", model.BorrowerSbl);
            parameter.Add("@BorrowerTotal", model.BorrowerTotal);
            parameter.Add("@LoiMicroLoan", model.LoiMicroLoan);
            parameter.Add("@LoiSbl", model.LoiSbl);
            parameter.Add("@LoiTotal", model.LoiTotal);
            parameter.Add("@BorrowerTarget", model.BorrowerTarget);
            parameter.Add("@ShortageNoOfBorrower", model.ShortageNoOfBorrower);
            parameter.Add("@OverdueNo", model.OverdueNo);
            parameter.Add("@OverdueAmount", model.OverdueAmount);
            parameter.Add("@OverdueInDeNo", model.OverdueInDeNo);
            parameter.Add("@OverdueInDeAmount", model.OverdueInDeAmount);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllPortfolioAnalysisUpdate", parameter);
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


    [HttpPost("UpdateCommentsByBm")]
    public async Task<IActionResult> UpdateCommentsByBm([FromBody] AllPortfolioAnalysis model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try

        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();

            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@AnalysisId", model.AnalysisId);
            parameter.Add("@BmComments", model.BmComments);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllPortfolioAnalysisUpdateByBm", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Already exists")
                return BadRequest(message);

            if (message == "You Can not Update")
                return BadRequest(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error updating data." + e.Message);
        }
    }


    [HttpPost("UpdateCommentsByManager")]
    public async Task<IActionResult> UpdateCommentsByManager([FromBody] AllPortfolioAnalysis model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();

            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@AnalysisId", model.AnalysisId);
            parameter.Add("@SupervisorRemarks", model.SupervisorRemarks);
            parameter.Add("@SupervisorComments", model.SupervisorComments);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllPortfolioAnalysisUpdateByManager", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Already exists")
                return BadRequest(message);


            if (message == "You Can not Update")
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
            parameter.Add("@AnalysisId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllPortfolioAnalysisDelete", parameter);

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
