namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class RmVisitController(IUnitOfWork unitOfWork, IFileUploadService fileUploadService) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IFileUploadService _fileUploadService = fileUploadService;
    private string _userId;



    [Authorize]
    [Authorize(Roles = "Super Admin,Operations Manager,Operations Head, Country Team Lead")]
    [HttpGet("List/{fromDate}/{tillDate}")]
    public async Task<IActionResult> List([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@Role", user.Role);
            var data = await _unitOfWork.SP_Call.List<RmVisitView>("OpsVisitGetByList", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize]
    //[Authorize(Roles = "Super Admin, Regional Manager,Area Manager")]
    [HttpGet("ListByUser/{fromDate}/{tillDate}")]
    public async Task<IActionResult> ListByUser([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<RmVisitView>("OpsRmVisitGetByUser", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize]
    //[Authorize(Roles = "Super Admin, Regional Manager,Area Manager")]
    [HttpGet("ListByManager/{fromDate}/{tillDate}")]
    public async Task<IActionResult> ListByManager([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<RmVisitView>("OpsVisitGetByManager", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize]
    [Authorize(Roles = "Super Admin,Operations Manager,Operations Head, Country Team Lead")]
    [HttpGet("ListByApproved/{fromDate}/{tillDate}")]
    public async Task<IActionResult> ListByApproved([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<RmVisitView>("OpsVisitGetByApproved", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize]
    //[Authorize(Roles = "Super Admin, Regional Manager,Area Manager")]
    [HttpGet("DetailsById/{id}")]
    public async Task<IActionResult> DetailsById(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@RmVisitId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<RmVisit>("OpsVisitGetDetailsById", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,Operations Head, Country Team Lead,Operations Manager")]
    [HttpGet("History/{fromDate}/{tillDate}")]
    public async Task<IActionResult> History([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<VisitInfoHistoryView>("OpsVisitInfoGetAllHistory", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,Operations Head, Country Team Lead,Operations Manager")]
    [HttpGet("Summary/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Summary([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            var data = await _unitOfWork.SP_Call.List<VisitInfoSummaryView>("OpsVisitInfoSummary", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }





    [Authorize]
    //[Authorize(Roles = "Super Admin, Regional Manager,Area Manager")]
    [HttpGet("DetailsView/{id}")]
    public async Task<IActionResult> DetailsView(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@RmVisitId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<RmVisitView>("OpsRmVisitViewGetById", parameter);

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
    //[Authorize(Roles = "Super Admin, Regional Manager,Area Manager")]
    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@RmVisitId", id);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.OneRecord<RmVisit>("OpsRmVisitGetById", parameter);

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

    //[Authorize]
    //[Authorize(Roles = "Super Admin, Regional Manager,Area Manager")]
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] RmVisit model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@VisitDate", model.VisitDate);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@VisitType", model.VisitType);
            parameter.Add("@StayOvernight", model.StayOvernight);
            parameter.Add("@ManagerId", model.ManagerId);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsRmVisitCreate", parameter);

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

    [Authorize]
    //[Authorize(Roles = "Super Admin, Regional Manager,Area Manager")]
    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromForm] RmVisit model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@RmVisitId", model.RmVisitId);
            parameter.Add("@VisitDate", model.VisitDate);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@VisitType", model.VisitType);
            parameter.Add("@StayOvernight", model.StayOvernight);
            parameter.Add("@ManagerId", model.ManagerId);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsRmVisitUpdate", parameter);
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


    [Authorize]
    //[Authorize(Roles = "Super Admin, Regional Manager,Area Manager")]
    [HttpPost("Submit")]
    public async Task<IActionResult> Submit([FromForm] RmVisitView model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@RmVisitId", model.RmVisitId);
            parameter.Add("@SubmitRemarks", model.SubmitRemarks);
            parameter.Add("@EmployeeId", user.EmployeeId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsRmVisitSubmit", parameter);
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

    [Authorize]
    //[Authorize(Roles = "Super Admin, Regional Manager,Area Manager")]
    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@RmVisitId", id);
            parameter.Add("@EmployeeId", user.EmployeeId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsRmVisitDelete", parameter);

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

    [HttpPost("ChecklistUpdate")]
    public async Task<IActionResult> ChecklistUpdate([FromBody] VisitDetails[] models)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {


            foreach (var model in models)
            {
                var fileUrl = "";
                if (model.File is not null && model.File.Length > 0)
                    fileUrl = await _fileUploadService.GetUploadUrlAsync(model.File);

                var parameter = new DynamicParameters();
                parameter.Add("@DetailsId", model.DetailsId);
                parameter.Add("@AnswerShort", model.AnswerShort);
                parameter.Add("@AnswerLong", model.AnswerLong);
                parameter.Add("@FileUrl", fileUrl);
                await _unitOfWork.SP_Call.Execute("OpsVisitChecklistUpdate", parameter);
            }

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [Authorize]
    //[Authorize(Roles = "Super Admin, Regional Manager,Area Manager")]
    [HttpGet("Checklist/{id}")]
    public async Task<IActionResult> Checklist(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@RmVisitId", id);

            var data = await _unitOfWork.SP_Call.List<VisitDetails>("OpsVisitChecklistGetById", parameter);

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


    [HttpPost("Accept")]
    public async Task<IActionResult> Accept([FromForm] RmVisitView model)

    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@RmVisitId", model.RmVisitId);
            parameter.Add("@AcceptRemarks", model.AcceptRemarks);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsVisitAccept", parameter);
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


    [HttpPost("Reject")]
    public async Task<IActionResult> Reject([FromForm] RmVisitView model)

    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@RmVisitId", model.RmVisitId);
            parameter.Add("@RejectRemarks", model.RejectRemarks);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsVisitReject", parameter);
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
