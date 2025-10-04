namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class EvaluationController(IUnitOfWork unitOfWork, IMailSender mailSender, ILogger<EmployeesController> logger) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<EmployeesController> _logger = logger;
    private string _userId;


    [HttpGet("AllList")]
    public async Task<IActionResult> AllList()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<Evaluation>("UrEvaluationGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,HR Manager,HR Executive,Internal Audit Manager, Internal Audit Officer, Assistant Audit Manager")]
    [HttpGet("List/{SelectYear}/{Frequency}/{BranchId}/{Employee}")]
    public async Task<IActionResult> List([FromRoute] string SelectYear, [FromRoute] string Frequency, [FromRoute] string BranchId, [FromRoute] string Employee)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@SelectYear", SelectYear);
            parameter.Add("@Frequency", Frequency);
            parameter.Add("@BranchId", BranchId);
            parameter.Add("@Employee", Employee);

            var data = await _unitOfWork.SP_Call.List<EvaluationList>("UrEvaluationGetList", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,HR Manager,HR Executive,Internal Audit Manager, Internal Audit Officer, Assistant Audit Manager")]
    [HttpGet("ListThree/{SelectYear}/{BranchId}/{Employee}")]
    public async Task<IActionResult> ListThree([FromRoute] string SelectYear, [FromRoute] string BranchId, [FromRoute] string Employee)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@SelectYear", SelectYear);
            parameter.Add("@BranchId", BranchId);
            parameter.Add("@Employee", Employee);

            var data = await _unitOfWork.SP_Call.List<EvaluationList>("UrEvaluationThreeGetList", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,HR Manager,HR Executive,Internal Audit Manager, Internal Audit Officer, Assistant Audit Manager")]
    [HttpGet("ListSix/{SelectYear}/{BranchId}/{Employee}")]
    public async Task<IActionResult> ListSix([FromRoute] string SelectYear, [FromRoute] string BranchId, [FromRoute] string Employee)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@SelectYear", SelectYear);
            parameter.Add("@BranchId", BranchId);
            parameter.Add("@Employee", Employee);

            var data = await _unitOfWork.SP_Call.List<EvaluationList>("UrEvaluationSixGetList", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("ListByReviewer")]
    public async Task<IActionResult> ListByReviewer()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@ReviewerId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<Evaluation>("UrEvaluationGetByReviewer", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("ListByUser")]
    public async Task<IActionResult> ListByUser()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@UserId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<Evaluation>("UrEvaluationGetByUser", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("ListByReject/{id}")]
    public async Task<IActionResult> ListByReject(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@BranchId", id);

            var data = await _unitOfWork.SP_Call.List<Evaluation>("UrEvaluationGetByRejected", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Listbymanager")]
    public async Task<IActionResult> Listbymanager()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@ManagerId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<Evaluation>("UrEvaluationGetByManager", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Listbysecondmanager")]
    public async Task<IActionResult> Listbysecondmanager()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@SecondManagerId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<Evaluation>("UrEvaluationGetBySecondManager", parameter);

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

            var data = await _unitOfWork.SP_Call.OneRecord<Evaluation>("UrEvaluationGetById", parameter);

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


    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] Evaluation model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            if (model.ManagerId == user.EmployeeId)
                return BadRequest("Please select correct manager");

            var parameter = new DynamicParameters();
            parameter.Add("@EvaluationTypeId", model.EvaluationTypeId);
            parameter.Add("@ManagerId", model.ManagerId);
            parameter.Add("@UserId", user.EmployeeId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("UrEvaluationCreate ", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            return Created("", message);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromForm] Evaluation model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaluationId", model.EvaluationId);
            parameter.Add("@EvaluationTypeId", model.EvaluationTypeId);
            parameter.Add("@ManagerId", model.ManagerId);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("UrEvaluationUpdate", parameter);
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

    [HttpPost("SubmitToManager")]
    public async Task<IActionResult> SubmitToManager([FromForm] Evaluation model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaluationId", model.EvaluationId);
            parameter.Add("@SubmitDate", model.SubmitDate);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("UrEvaluationSubmitToManager", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Already exists")
                return BadRequest(message);

            if (string.IsNullOrWhiteSpace(message) == false)
            {
                try
                {

                    var tmp = await _mailSender.SendEmailWithBody(
                        message,
                        "",
                        SD.BccEmail,

                        SD.EvaluationReview,
                        "Dear Manager, new evaluation submitted for your kind review at MyUmoja. Please check.");
                    //await _emailSender.SendEmailAsync(
                    //    "hr@umojamicrofinance.com, " + message,
                    //    "Evaluation submited for review",
                    //    "Dear Manager, new evaluation submitted for your kind review at MyUmoja. Pleaase check.");
                }
                catch (Exception ex)
                {
                    _logger.LogInformation("Remote work Error at: {ex}", ex.Message);
                }
            }

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error updating data." + e.Message);
        }
    }

    [HttpPost("SubmitToManagerThree")]
    public async Task<IActionResult> SubmitToManagerThree([FromForm] Evaluation model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaluationId", model.EvaluationId);
            parameter.Add("@SubmitDate", model.SubmitDate);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("UrEvaluationThreeSubmitToManager", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Already exists")
                return BadRequest(message);

            if (string.IsNullOrWhiteSpace(message) == false)
            {
                try
                {

                    var tmp = await _mailSender.SendEmailWithBody(
                        message,
                        "",
                        SD.BccEmail,

                        SD.EvaluationReview,
                        "Dear Manager, new evaluation submitted for your kind review at MyUmoja. Please check.");
                    //await _emailSender.SendEmailAsync(
                    //    "hr@umojamicrofinance.com, " + message,
                    //    "Evaluation submited for review",
                    //    "Dear Manager, new evaluation submitted for your kind review at MyUmoja. Pleaase check.");
                }
                catch (Exception ex)
                {
                    _logger.LogInformation("Remote work Error at: {ex}", ex.Message);
                }
            }

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error updating data." + e.Message);
        }
    }

    [HttpPost("SubmitToManagerSix")]
    public async Task<IActionResult> SubmitToManagerSix([FromForm] Evaluation model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaluationId", model.EvaluationId);
            parameter.Add("@SubmitDate", model.SubmitDate);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("UrEvaluationSixSubmitToManager", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Already exists")
                return BadRequest(message);

            if (string.IsNullOrWhiteSpace(message) == false)
            {
                try
                {

                    var tmp = await _mailSender.SendEmailWithBody(
                        message,
                        "",
                        SD.BccEmail,

                        SD.EvaluationReview,
                        "Dear Manager, new evaluation submitted for your kind review at MyUmoja. Please check.");
                    //await _emailSender.SendEmailAsync(
                    //    "hr@umojamicrofinance.com, " + message,
                    //    "Evaluation submited for review",
                    //    "Dear Manager, new evaluation submitted for your kind review at MyUmoja. Pleaase check.");
                }
                catch (Exception ex)
                {
                    _logger.LogInformation("Remote work Error at: {ex}", ex.Message);
                }
            }

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error updating data." + e.Message);
        }
    }

    [HttpPost("Reject")]
    public async Task<IActionResult> Reject([FromForm] Evaluation model)

    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaluationId", model.EvaluationId);
            parameter.Add("@RejectRemarks", model.RejectRemarks);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("UrEvaluationReject", parameter);
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

    [HttpPost("Accept")]
    public async Task<IActionResult> Accept([FromForm] Evaluation model)

    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaluationId", model.EvaluationId);
            parameter.Add("@AcceptRemarks", model.AcceptRemarks);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("UrEvaluationAccept", parameter);
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

    [Authorize(Roles = "Super Admin,HR Manager,HR Executive, Internal Audit Manager, Internal Audit Officer, Assistant Audit Manager")]
    [HttpGet("Summary/{evaluationTypeId}/{year}")]
    public async Task<IActionResult> Summary(string evaluationTypeId, int year)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaluationTypeId", evaluationTypeId);
            parameter.Add("@EvaYear", year);
            var data = await _unitOfWork.SP_Call.List<EvaluationSummary>("UrEvaluationSummary", parameter);

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


    [HttpGet("DetailsInfo/{id}")]
    public async Task<IActionResult> DetailsInfo(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaluationId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<EvaluationInfo>("UrEvaluationDetailsInfoGetById", parameter);

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


    [HttpGet("DetailsInfoThree/{id}")]
    public async Task<IActionResult> DetailsInfoThree(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaluationId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<EvaluationInfo>("UrEvaluationThreeDetailsInfoGetById", parameter);

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

    [HttpGet("DetailsInfoSix/{id}")]
    public async Task<IActionResult> DetailsInfoSix(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaluationId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<EvaluationInfo>("UrEvaluationSixDetailsInfoGetById", parameter);

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


    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaluationId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("UrEvaluationDelete", parameter);

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

    [HttpDelete("Reset/{id}")]
    public async Task<IActionResult> Reset(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EvaluationId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("UrEvaluationReset", parameter);

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


    [Authorize(Roles = "Super Admin,HR Manager,HR Executive,Internal Audit Manager, Internal Audit Officer, Assistant Audit Manager")]
    [HttpGet("PendingList/{SelectYear}/{Frequency}/{BranchId}/{Employee}")]
    public async Task<IActionResult> PendingList([FromRoute] string SelectYear, [FromRoute] string Frequency, [FromRoute] string BranchId, [FromRoute] string Employee)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@SelectYear", SelectYear);
            parameter.Add("@Frequency", Frequency);
            parameter.Add("@BranchId", BranchId);
            parameter.Add("@Employee", Employee);

            var data = await _unitOfWork.SP_Call.List<EvaluationList>("UrEvaluationGetListPending", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


}
