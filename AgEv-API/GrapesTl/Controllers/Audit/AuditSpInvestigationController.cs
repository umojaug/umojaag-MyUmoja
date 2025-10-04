namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AuditSpInvestigationController(IUnitOfWork unitOfWork, IFileUploadService fileUploadService) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IFileUploadService _fileUploadService = fileUploadService;

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<SpInvestigationView>("AuditSpInvestigationGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }



    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<SpInvestigation>("AuditSpInvestigationGetById", parameter);

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


    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromForm] SpInvestigation model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationId", model.InvestigationId);
            parameter.Add("@Title", model.Title);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@InvestigationDate", model.InvestigationDate);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditSpInvestigationUpdate", parameter);
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

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditSpInvestigationDelete", parameter);

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

    [HttpGet("InvestigationInfo/{id}")]
    public async Task<IActionResult> InvestigationInfo(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationId", id);
            var data = await _unitOfWork.SP_Call.OneRecord<SpInvestigationView>("AuditSpInvestigationInfo", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpGet("DetailsList/{id}")]
    public async Task<IActionResult> DetailsList(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationId", id);

            var data = await _unitOfWork.SP_Call.List<SpInvestigationDetails>("AuditSpInvestigationDetailsGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }



    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpGet("InvestigationDetails/{id}/")]
    public async Task<IActionResult> InvestigationDetails(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationDetailsId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<SpInvestigationDetails>("AuditSpInvestigationDetailsGetById", parameter);

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



    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromForm] SpInvestigation model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Title", model.Title);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@InvestigationDate", model.InvestigationDate);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditSpInvestigationCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            //return Created("", SD.Message_Save);
            return Created("", message);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpPost("DetailsCreate")]
    public async Task<IActionResult> DetailsCreate([FromForm] SpInvestigationDetails model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var fileUrl1 = "";
            if (model.File1 is not null && model.File1.Length > 0)
                fileUrl1 = await _fileUploadService.GetUploadUrlAsync(model.File1);

            var fileUrl2 = "";
            if (model.File2 is not null && model.File2.Length > 0)
                fileUrl2 = await _fileUploadService.GetUploadUrlAsync(model.File2);

            var fileUrl3 = "";
            if (model.File3 is not null && model.File3.Length > 0)
                fileUrl3 = await _fileUploadService.GetUploadUrlAsync(model.File3);

            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationId", model.InvestigationId);
            parameter.Add("@Guideline", model.Guideline);
            parameter.Add("@TestSteps", model.TestSteps);
            parameter.Add("@Evidences1", fileUrl1);
            parameter.Add("@Evidences2", fileUrl2);
            parameter.Add("@Evidences3", fileUrl3);
            parameter.Add("@ReportInputs", String.IsNullOrWhiteSpace(model.ReportInputs) == true ? "" : model.ReportInputs);
            parameter.Add("@TestConclusion", model.TestConclusion);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditSpInvestigationDetailsCreate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            //return Created("", SD.Message_Save);
            return Created("", message);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }





    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpPost("DetailsUpdate")]
    public async Task<IActionResult> DetailsUpdate([FromForm] SpInvestigationDetails model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var fileUrl1 = "";
            if (model.File1 is not null && model.File1.Length > 0)
                fileUrl1 = await _fileUploadService.GetUploadUrlAsync(model.File1);

            var fileUrl2 = "";
            if (model.File2 is not null && model.File2.Length > 0)
                fileUrl2 = await _fileUploadService.GetUploadUrlAsync(model.File2);

            var fileUrl3 = "";
            if (model.File3 is not null && model.File3.Length > 0)
                fileUrl3 = await _fileUploadService.GetUploadUrlAsync(model.File3);

            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationDetailsId", model.InvestigationDetailsId);
            parameter.Add("@Evidences1", fileUrl1);
            parameter.Add("@Evidences2", fileUrl2);
            parameter.Add("@Evidences3", fileUrl3);
            parameter.Add("@ReportInputs", String.IsNullOrWhiteSpace(model.ReportInputs) == true ? "" : model.ReportInputs);
            parameter.Add("@TestConclusion", model.TestConclusion);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditSpInvestigationDetailsUpdate", parameter);
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

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpDelete("DetailsDelete/{id}")]
    public async Task<IActionResult> DetailsDelete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationDetailsId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditSpInvestigationDetailsDelete", parameter);

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

    [Authorize]
    [HttpPost("StatusUpdate/{id}")]
    public async Task<IActionResult> StatusUpdate(string id)
    {
        try
        {


            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditSpInvestigationStatusUpdate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Cannot update status")
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
