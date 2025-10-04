namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AllObdBorrowerVisitController(IUnitOfWork unitOfWork) : ControllerBase
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
            var data = await _unitOfWork.SP_Call.List<AllObdBorrowerVisitList>("OpsAllObdBorrowerVisitListGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);

        }
    }

    [HttpGet("CashBalanceList/{id}")]
    public async Task<IActionResult> CashBalanceList(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AllVisitId", id);
            var data = await _unitOfWork.SP_Call.OneRecord<AllObdBorrowerVisit>("OpsAllObdBorrowerVisitGetAll", parameter);

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

    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@ObdBorrowerId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AllObdBorrowerVisitList>("OpsAllObdBorrowerVisitListGetById", parameter);

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
    public async Task<IActionResult> Create([FromBody] AllObdBorrowerVisitList model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@AllVisitId", model.AllVisitId);
            parameter.Add("@GroupName", model.GroupName);
            parameter.Add("@BorrowerName", model.BorrowerName);
            parameter.Add("@OverdueAmount", model.OverdueAmount);
            parameter.Add("@LoanBalance", model.LoanBalance);
            parameter.Add("@CollectedAmount", model.CollectedAmount);
            parameter.Add("@TakenAction", model.TakenAction);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllOdbBorrowerVisitCreate", parameter);

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
    public async Task<IActionResult> Update([FromBody] AllObdBorrowerVisitList model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@ObdBorrowerId", model.ObdBorrowerId);
            parameter.Add("@GroupName", model.GroupName);
            parameter.Add("@BorrowerName", model.BorrowerName);
            parameter.Add("@OverdueAmount", model.OverdueAmount);
            parameter.Add("@LoanBalance", model.LoanBalance);
            parameter.Add("@CollectedAmount", model.CollectedAmount);
            parameter.Add("@TakenAction", model.TakenAction);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllObdBorrowerVisitUpdate", parameter);
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

    [HttpPost("UpdateByBm")]
    public async Task<IActionResult> UpdateByBm([FromBody] AllObdBorrowerVisit model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();

            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@ObdBorrowerId", model.ObdBorrowerId);
            parameter.Add("@BmComments", model.BmComments);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllObdBorrowerVisitUpdateByBm", parameter);
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

    [HttpPost("UpdateBySupervisor")]
    public async Task<IActionResult> UpdateBySupervisor([FromBody] AllObdBorrowerVisit model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();

            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@ObdBorrowerId", model.ObdBorrowerId);
            parameter.Add("@SupervisorComments", model.SupervisorComments);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllObdBorrowerVisitUpdateBySupervisor", parameter);
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
            parameter.Add("@ObdBorrowerId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllObdBorrowrVisitDelete", parameter);

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
