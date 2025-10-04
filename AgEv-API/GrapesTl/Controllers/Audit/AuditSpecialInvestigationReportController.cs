namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AuditSpecialInvestigationReportController(IUnitOfWork unitOfWork, IFileUploadService fileUploadService) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IFileUploadService _fileUploadService = fileUploadService;
    private string _userId;

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@ReportType", "Special Investigation");

            var data = await _unitOfWork.SP_Call.List<SpecialInvestigationReportView>("AuditSpecialInvestigationReportGetAll", parameter);

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
            parameter.Add("@ReportId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<SpecialInvestigationReportView>("AuditSpecialInvestigationReportGetById", parameter);

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
    public async Task<IActionResult> Create([FromForm] SpecialInvestigationReport model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var fileUrl1 = "";
            if (model.File1 is not null && model.File1.Length > 0)
                fileUrl1 = await _fileUploadService.GetUploadUrlAsync(model.File1);

            var fileUrl2 = "";
            if (model.File2 is not null && model.File2.Length > 0)
                fileUrl2 = await _fileUploadService.GetUploadUrlAsync(model.File2);

            var parameter = new DynamicParameters();
            parameter.Add("@ReportingQuarter", model.ReportingQuarter);
            parameter.Add("@MonthOfAudit", model.MonthOfAudit);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@DetectionMethod", model.DetectionMethod);
            parameter.Add("@TypeOfFraudId", model.TypeOfFraudId);
            parameter.Add("@WhoMightBeInvolved", model.WhoMightBeInvolved);
            parameter.Add("@PositionOfFraudster", model.PositionOfFraudster);
            parameter.Add("@LengthOfServiceOfFraudster", model.@LengthOfServiceOfFraudster);
            parameter.Add("@HowIsTheFraudBeingPerpetrated", model.HowIsTheFraudBeingPerpetrated);
            parameter.Add("@NumberOfOccurences", model.NumberOfOccurences);
            parameter.Add("@PotentialWitness", model.PotentialWitness);
            parameter.Add("@Statements", fileUrl1);
            parameter.Add("@Evidence1", fileUrl2);
            parameter.Add("@Observations", model.Observations);
            parameter.Add("@DefectiveControlsIdentified", model.DefectiveControlsIdentified);
            parameter.Add("@EstimatedFraudLoss", model.EstimatedFraudLoss);
            parameter.Add("@AmountRecovered", model.AmountRecovered);
            parameter.Add("@Recommendations", model.Recommendations);
            parameter.Add("@ManagementResponse", model.ManagementResponse);
            parameter.Add("@ImplementedBy", model.ImplementedBy);
            parameter.Add("@IAInCharge", model.IAInCharge);
            parameter.Add("@Status", model.Status);
            parameter.Add("@CurrentStatusUpdate", model.CurrentStatusUpdate);
            parameter.Add("@ReportType", "Special Investigation");

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditSpecialInvestigationReportCreate", parameter);

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
    public async Task<IActionResult> Update([FromForm] SpecialInvestigationReport model)
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

            var parameter = new DynamicParameters();
            parameter.Add("@ReportId", model.ReportId);
            parameter.Add("@ReportingQuarter", model.ReportingQuarter);
            parameter.Add("@MonthOfAudit", model.MonthOfAudit);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@DetectionMethod", model.DetectionMethod);
            parameter.Add("@TypeOfFraudId", model.TypeOfFraudId);
            parameter.Add("@WhoMightBeInvolved", model.WhoMightBeInvolved);
            parameter.Add("@PositionOfFraudster", model.PositionOfFraudster);
            parameter.Add("@LengthOfServiceOfFraudster", model.@LengthOfServiceOfFraudster);
            parameter.Add("@HowIsTheFraudBeingPerpetrated", model.HowIsTheFraudBeingPerpetrated);
            parameter.Add("@NumberOfOccurences", model.NumberOfOccurences);
            parameter.Add("@PotentialWitness", model.PotentialWitness);
            parameter.Add("@Statements", fileUrl1);
            parameter.Add("@Evidence1", fileUrl2);
            parameter.Add("@Observations", model.Observations);
            parameter.Add("@DefectiveControlsIdentified", model.DefectiveControlsIdentified);
            parameter.Add("@EstimatedFraudLoss", model.EstimatedFraudLoss);
            parameter.Add("@AmountRecovered", model.AmountRecovered);
            parameter.Add("@Recommendations", model.Recommendations);
            parameter.Add("@ManagementResponse", model.ManagementResponse);
            parameter.Add("@ImplementedBy", model.ImplementedBy);
            parameter.Add("@IAInCharge", model.IAInCharge);
            parameter.Add("@Status", model.Status);
            parameter.Add("@CurrentStatusUpdate", model.CurrentStatusUpdate);
            //parameter.Add("@ReportType", "Special Investigation");

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditSpecialInvestigationReportUpdate", parameter);
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
            parameter.Add("@ReportId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditSpecialInvestigationReportDelete", parameter);

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
