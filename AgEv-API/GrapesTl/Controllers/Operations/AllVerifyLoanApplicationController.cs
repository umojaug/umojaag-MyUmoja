namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AllVerifyLoanApplicationController(IUnitOfWork unitOfWork) : ControllerBase
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
            var data = await _unitOfWork.SP_Call.List<AllVerifyLoanApplication>("OpsAllVerifyLoanAppListGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("VerifyLoanAppList/{id}")]
    public async Task<IActionResult> VerifyLoanAppList(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AllVisitId", id);
            var data = await _unitOfWork.SP_Call.OneRecord<AllVerifyLoanApplication>("OpsAllVerifyLoanAppGetAll", parameter);

            return Ok(data);
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

            var data = await _unitOfWork.SP_Call.OneRecord<AllVerifyLoanApplication>("OpsAllVerifyLoanAppGetById", parameter);

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
            parameter.Add("@VerificationId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AllVerifyLoanApplication>("OpsAllVerifyLoanAppListGetById", parameter);

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
    public async Task<IActionResult> Create([FromBody] AllPortfolioAnalysisList model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@AllVisitId", model.AllVisitId);
            parameter.Add("@LoId", user.Id);
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
            await _unitOfWork.SP_Call.Execute("OpsAllPortfolioAnalysisListCreate", parameter);

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
    public async Task<IActionResult> Update([FromBody] AllVerifyLoanApplication model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@VerificationId", model.VerificationId);
            parameter.Add("@Status", model.Status);
            parameter.Add("@Number", model.Number);
            parameter.Add("@Findings", model.Findings);
            parameter.Add("@TakenSteps", model.TakenSteps);



            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllVerifyLoanAppUpdate", parameter);
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

    [HttpPost("UpdateComments")]
    public async Task<IActionResult> UpdateComments([FromBody] AllVerifyLoanApplication model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@VerificationId", model.VerificationId);
            parameter.Add("@Findings", model.Findings);
            parameter.Add("@TakenSteps", model.TakenSteps);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllVerifyLoanAppUpdate", parameter);
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
    public async Task<IActionResult> UpdateCommentsByBm([FromBody] AllVerifyLoanApplication model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();

            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@VerificationId", model.VerificationId);
            parameter.Add("@BmComments", model.BmComments);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllVerifyLoanAppUpdateByBm", parameter);
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
    public async Task<IActionResult> UpdateCommentsByManager([FromBody] AllVerifyLoanApplication model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();

            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@VerificationId", model.VerificationId);
            parameter.Add("@SupervisorComments", model.SupervisorComments);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllVerifyLoanAppUpdateByManager", parameter);
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
            parameter.Add("@OpsBmBankInfoId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsBmBankInfoDelete", parameter);

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
