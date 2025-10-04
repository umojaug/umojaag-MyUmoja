namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AcLedgerController(IUnitOfWork unitOfWork, IHttpContextAccessor accessor) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly string _userId = accessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

    [HttpGet("select")]
    public async Task<IActionResult> Select()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<LedgerDto>("acLedgerGetAll");
            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerCode + " - " + a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("selectByNameRole")]
    public async Task<IActionResult> SelectByNameRole()
    {
        try
        {

            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@Role", user.Role);
            var data = await _unitOfWork.SP_Call.List<LedgerDto>("AcLedgerSelectByRole", parameter);
            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerCode + " - " + a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("selectByPayment")]
    public async Task<IActionResult> SelectByPayment()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<LedgerDto>("AcLedgerSelectByPayment");

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerCode + " - " + a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("selectByReceive")]
    public async Task<IActionResult> SelectByReceive()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<LedgerDto>("AcLedgerSelectByReceive");

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerCode + " - " + a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("selectByTransfer")]
    public async Task<IActionResult> SelectByTransfer()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<LedgerDto>("AcLedgerSelectByTransfer");
            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerCode + " - " + a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("selectByJournal")]
    public async Task<IActionResult> SelectByJournal()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<LedgerDto>("AcLedgerSelectByJournal");

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerCode + " - " + a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("selectByIncome")]
    public async Task<IActionResult> SelectByIncome()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<LedgerDto>("AcLedgerSelectByIncome");

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerCode + " - " + a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("selectByExpense")]
    public async Task<IActionResult> SelectByExpense()
    {
        try
        {
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@Role", user.Role);

            var data = await _unitOfWork.SP_Call.List<LedgerDto>("AcLedgerSelectByExpense", parameter);

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerCode + " - " + a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("selectBankByBranch")]
    public async Task<IActionResult> SelectBankByBranch()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<LedgerDto>("AcLedgerSelectBankByBranch");

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerCode + " - " + a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("selectFundByHead")]
    public async Task<IActionResult> SelectFundByHead()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<LedgerDto>("AcLedgerFundByHead");

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerCode + " - " + a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("selectByBank")]
    public async Task<IActionResult> SelectByBank()
    {
        try
        {

            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<LedgerDto>("AcLedgerSelectByBank", parameter);

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerCode + " - " + a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("selectByCash")]
    public async Task<IActionResult> SelectByCash()
    {
        try
        {

            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<LedgerDto>("AcLedgerSelectByCash", parameter);

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerCode + " - " + a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("selectByBankCash")]
    [AllowAnonymous]
    public async Task<IActionResult> SelectByBankCash()
    {
        try
        {


            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);
            //parameter.Add("@Role", user.Role);

            var data = await _unitOfWork.SP_Call.List<LedgerDto>("AcLedgerSelectByCashBank", parameter);

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerCode + " - " + a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("selectByAccountHead")]
    public async Task<IActionResult> SelectByAccountHead()
    {
        try
        {


            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            //parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@Role", user.Role);

            var data = await _unitOfWork.SP_Call.List<LedgerDto>("AcLedgerSelectByAccountHead", parameter);

            return Ok(data.Select(a => new { listId = a.LedgerId, listName = a.LedgerCode + " - " + a.LedgerName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("selectByClassification")]
    public async Task<IActionResult> SelectByClassification()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<ClassificationDto>("AcLedgerSelectByClassification");

            return Ok(data.Select(a => new { listId = a.ClassificationName, listName = a.ClassificationName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("journalLedger/{id}")]
    public async Task<IActionResult> JournalLedger(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@LedgerId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AcLedger>("AcLedgerSearchByLedgerId", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve details data." + e.Message);
        }
    }
}
