namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AuditDpInvestigationController(IUnitOfWork unitOfWork, IFileUploadService fileUploadService) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IFileUploadService _fileUploadService = fileUploadService;

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<DepartmentalInvestigationReportView>("AuditDpInvestigationGetAll");

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
            parameter.Add("@DpInvestigationId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<DepartmentalInvestigationReport>("AuditDpInvestigationGetById", parameter);

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
    public async Task<IActionResult> Create([FromForm] DepartmentalInvestigationReport model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Title", model.Title);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@TestSteps", model.TestSteps);
            parameter.Add("@InvestigationDate", model.InvestigationDate);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditDpInvestigationCreate", parameter);

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
    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromForm] DepartmentalInvestigationReport model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@DpInvestigationId", model.DpInvestigationId);
            parameter.Add("@Title", model.Title);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@InvestigationDate", model.InvestigationDate);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditDpInvestigationUpdate", parameter);
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
            parameter.Add("@DpInvestigationId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditDpInvestigationDelete", parameter);

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

    [HttpGet("DepartmentalInvestigationInfo/{id}")]
    public async Task<IActionResult> InvestigationInfo(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@DpInvestigationId", id);
            var data = await _unitOfWork.SP_Call.OneRecord<DepartmentalInvestigationReportView>("AuditDpInvestigationGetById", parameter);

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
            parameter.Add("@DpInvestigationId", id);

            var data = await _unitOfWork.SP_Call.List<DepartmentalInvestigationReportDetailsView>("AuditDpInvestigationDetailsGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }



    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpGet("DepartmentalInvestigationDetails/{id}/")]
    public async Task<IActionResult> InvestigationDetails(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationDetailsId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<DepartmentalInvestigationReportDetailsView>("AuditDpInvestigationDetailsGetById", parameter);

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
    [HttpPost("DetailsUpdate")]
    public async Task<IActionResult> DetailsUpdate([FromForm] DepartmentalInvestigationReportDetails model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var fileUrl = "";
            if (model.File is not null && model.File.Length > 0)
                fileUrl = await _fileUploadService.GetUploadUrlAsync(model.File);

            var parameter = new DynamicParameters();
            parameter.Add("@InvestigationDetailsId", model.InvestigationDetailsId);
            parameter.Add("@TestingDate", model.TestingDate);
            parameter.Add("@SampledMonth", model.SampledMonth);
            parameter.Add("@AuditPeriod", model.AuditPeriod);
            parameter.Add("@SampleSelectionMethod", model.SampleSelectionMethod);
            parameter.Add("@ControlFrequency", model.ControlFrequency);
            parameter.Add("@PopulationSize", model.PopulationSize);
            parameter.Add("@SampleSize", model.SampleSize);
            parameter.Add("@TestConclusion", model.TestConclusion);
            parameter.Add("@AuditFinding", model.AuditFinding);
            parameter.Add("@Evidences", fileUrl);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditDpInvestigationDetailsUpdate", parameter);
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

    //[Authorize]
    //[HttpPost("StatusUpdate/{id}")]
    //public async Task<IActionResult> StatusUpdate(string id)
    //{
    //    try
    //    {


    //        var parameter = new DynamicParameters();
    //        parameter.Add("@DpInvestigationId", id);

    //        parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
    //        await _unitOfWork.SP_Call.Execute("AuditDepartmentStatusUpdate", parameter);

    //        var message = parameter.Get<string>("Message");

    //        if (message == "Not found")
    //            return NotFound(message);

    //        if (message == "Cannot update status")
    //            return BadRequest(message);

    //        return NoContent();
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //         "Error deleting data." + e.Message);
    //    }
    //}

}
