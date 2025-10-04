namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AllVisitController(IUnitOfWork unitOfWork, IFileUploadService fileUploadService) : ControllerBase
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
            var data = await _unitOfWork.SP_Call.List<AmVisitView>("OpsVisitGetByList", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("ListByAdmin")]
    public async Task<IActionResult> ListByAdmin()
    {
        try
        {
            var parameter = new DynamicParameters();

            var data = await _unitOfWork.SP_Call.List<AllVisitView>("OpsAllVisitGetAllByAdmin");

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
    [HttpPost("Reopen")]
    public async Task<IActionResult> Reopen([FromForm] AllVisitView model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@AllVisitId", model.AllVisitId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllVisitReopne", parameter);
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

    [HttpGet("BranchSelect")]
    public async Task<IActionResult> Select()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<BranchView>("OpsAllBranchGetForSelect", parameter);
            return Ok(data.Select(a => new { listId = a.BranchId, listName = a.BranchName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectBranchManager")]
    public async Task<IActionResult> SelectBranchManager()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("OpsAllBmGetForSelect");
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectSupervisor")]
    public async Task<IActionResult> SelectSupervisor()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("OpsAllSupervisorGetForSelect");
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize]
    [HttpGet("Report/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Report([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<AllVisitView>("OpsAllVisitReport", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize]
    [HttpGet("MyReport/{fromDate}/{tillDate}")]
    public async Task<IActionResult> MyReport([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<AllVisitView>("OpsAllVisitMyReport", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize]
    [HttpGet("SupervisorReport/{fromDate}/{tillDate}")]
    public async Task<IActionResult> SupervisorReport([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<AllVisitView>("OpsAllVisitSupervisorReport", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize]
    [HttpGet("VisitCount/{fromDate}/{tillDate}")]
    public async Task<IActionResult> VisitCount([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<AllVisitCount>("OpsAllVisitCountReport", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [Authorize]
    [HttpGet("MyVisitCount/{fromDate}/{tillDate}")]
    public async Task<IActionResult> MyVisitCount([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<AllVisitCount>("OpsAllVisitCountMyReport", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize]
    [HttpGet("SupervisorVisitCount/{fromDate}/{tillDate}")]
    public async Task<IActionResult> SupervisorVisitCount([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<AllVisitCount>("OpsAllVisitCountSupervisorReport", parameter);

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

            var data = await _unitOfWork.SP_Call.List<AllVisitView>("OpsAllVisitGetByUser", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize]
    [HttpGet("ListByBranchManager")]
    public async Task<IActionResult> ListByBranchManager([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();

            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<AllVisitView>("OpsAllVisitGetByBM", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize]
    [HttpGet("ListByManager")]
    public async Task<IActionResult> ListByManager()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();

            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<AllVisitView>("OpsAllVisitGetByManager", parameter);

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

            var data = await _unitOfWork.SP_Call.List<AmVisitView>("OpsVisitGetByApproved", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize]
    [Authorize(Roles = "Super Admin, Regional Manager,Area Manager")]
    [HttpGet("DetailsById/{id}")]
    public async Task<IActionResult> DetailsById(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AmVisitId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AllVisit>("OpsVisitGetDetailsById", parameter);

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
            parameter.Add("@AllVisitId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AllVisitView>("OpsAllVisitViewGetById", parameter);

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
            parameter.Add("@AllVisitId", id);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.OneRecord<AllVisit>("OpsAllVisitGetById", parameter);

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
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] AllVisit model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@VisitDate", model.VisitDate);
            parameter.Add("@VisitEndDate", model.VisitEndDate);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@EntryTime", model.EntryTime);
            parameter.Add("@ExitTime", model.ExitTime);
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@VisitType", model.VisitType);
            parameter.Add("@StayOvernight", model.StayOvernight);
            parameter.Add("@PinName", model.PinName);
            parameter.Add("@ManagerPin", model.ManagerPin);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllVisitCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            if (message == "Please enter valid data")
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
    public async Task<IActionResult> Update([FromForm] AllVisit model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@AllVisitId", model.AllVisitId);
            parameter.Add("@VisitDate", model.VisitDate);
            parameter.Add("@VisitEndDate", model.VisitEndDate);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@EntryTime", model.EntryTime.ToString("hh:mm tt"));
            parameter.Add("@ExitTime", model.ExitTime.ToString("hh:mm tt"));
            parameter.Add("@EmployeeId", user.EmployeeId);
            parameter.Add("@VisitType", model.VisitType);
            parameter.Add("@StayOvernight", model.StayOvernight);
            parameter.Add("@PinName", model.PinName);
            parameter.Add("@ManagerPin", model.ManagerPin);
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllVisitUpdate", parameter);
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

    [HttpPost("CtlComments")]
    public async Task<IActionResult> Feedback([FromForm] CTLComments model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {

            //var fileUrl = "";
            //if (model.File is not null && model.File.Length > 0)
            //    fileUrl = await _fileUploadService.GetUploadUrlAsync(model.File);

            var parameter = new DynamicParameters();
            parameter.Add("@AllVisitId", model.AllVisitId);
            parameter.Add("@CtlComments", model.CtlComments);
            //parameter.Add("@DetailsStatus", model.DetailsStatus);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllVisitFeedback", parameter);
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

    [HttpPost("DocCreate")]
    public async Task<IActionResult> DocCreate([FromForm] AllVisitDocument model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var fileUrl = "";
            if (model.File is not null && model.File.Length > 0)
                fileUrl = await _fileUploadService.GetUploadUrlAsync(model.File);

            var parameter = new DynamicParameters();
            parameter.Add("@AllVisitId", model.AllVisitId);
            parameter.Add("@Title", model.Title);
            parameter.Add("@FileUrl", fileUrl);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllVisitDocumentCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Document Type Already exists")
                return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [HttpDelete("DocDelete/{id}")]
    public async Task<IActionResult> DocDelete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@VisitDocId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllVisitDocumentDelete", parameter);

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

    [HttpGet("DocList/{id}")]
    public async Task<IActionResult> DocList(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AllVisitId", id);

            var data = await _unitOfWork.SP_Call.List<AllVisitDocumentView>("OpsAllVisitDocumentGetAllById", parameter);

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
    [HttpPost("VisitClose")]
    public async Task<IActionResult> VisitClose([FromForm] AllVisitView model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@AllVisitId", model.AllVisitId);
            parameter.Add("@CloseRemarks", model.CloseRemarks);
            parameter.Add("@EmployeeId", user.EmployeeId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllVisitClose", parameter);
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
    public async Task<IActionResult> Submit([FromForm] AllVisitView model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@AllVisitId", model.AllVisitId);
            parameter.Add("@SubmitRemarks", model.SubmitRemarks);
            parameter.Add("@EmployeeId", user.EmployeeId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllVisitSubmit", parameter);
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
            parameter.Add("@AllVisitId", id);
            parameter.Add("@EmployeeId", user.EmployeeId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OpsAllVisitDelete", parameter);

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
            parameter.Add("@AmVisitId", id);

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
    public async Task<IActionResult> Accept([FromForm] AmVisitView model)

    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AmVisitId", model.AmVisitId);
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
    public async Task<IActionResult> Reject([FromForm] AmVisitView model)

    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@AmVisitId", model.AmVisitId);
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
