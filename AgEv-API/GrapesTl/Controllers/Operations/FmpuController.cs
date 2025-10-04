using GrapesTl.Models.Operations;

namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class FmpuController(IUnitOfWork unitOfWork, IFileUploadService fileUploadService) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IFileUploadService _fileUploadService = fileUploadService;
    private string _userId;


    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@ReportType", "FMPU");

            var data = await _unitOfWork.SP_Call.List<SpecialInvestigationReportView>("AuditSpecialInvestigationReportGetAll", parameter);

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
            parameter.Add("@ReportId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<SpecialInvestigationReport>("AuditSpecialInvestigationReportGetById", parameter);

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

            var fileUrl3 = "";
            if (model.File3 is not null && model.File3.Length > 0)
                fileUrl3 = await _fileUploadService.GetUploadUrlAsync(model.File3);

            var fileUrl4 = "";
            if (model.File4 is not null && model.File4.Length > 0)
                fileUrl4 = await _fileUploadService.GetUploadUrlAsync(model.File4);
            var fileUrl5 = "";
            if (model.File5 is not null && model.File5.Length > 0)
                fileUrl5 = await _fileUploadService.GetUploadUrlAsync(model.File5);
            var fileUrl6 = "";
            if (model.File6 is not null && model.File6.Length > 0)
                fileUrl6 = await _fileUploadService.GetUploadUrlAsync(model.File6);


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
            parameter.Add("@Statements", "");
            parameter.Add("@Evidence1", fileUrl1);
            parameter.Add("@Evidence2", fileUrl2);
            parameter.Add("@Evidence3", fileUrl3);
            parameter.Add("@Evidence4", fileUrl4);
            parameter.Add("@Evidence5", fileUrl5);
            parameter.Add("@Evidence6", fileUrl6);
            //parameter.Add("@DocumentReview1", model.DocumentReview1);
            //parameter.Add("@DocumentReview2", model.DocumentReview2);
            //parameter.Add("@DocumentReview3", model.DocumentReview3);
            //parameter.Add("@DocumentReview4", model.DocumentReview4);
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
            parameter.Add("@ReportType", "FMPU");
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditSpecialInvestigationReportCreate", parameter);

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
    public async Task<IActionResult> Update([FromForm] Fmpu model)
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

            var fileUrl3 = "";
            if (model.File3 is not null && model.File3.Length > 0)
                fileUrl3 = await _fileUploadService.GetUploadUrlAsync(model.File3);

            var fileUrl4 = "";
            if (model.File4 is not null && model.File4.Length > 0)
                fileUrl4 = await _fileUploadService.GetUploadUrlAsync(model.File4);
            var fileUrl5 = "";
            if (model.File5 is not null && model.File5.Length > 0)
                fileUrl5 = await _fileUploadService.GetUploadUrlAsync(model.File5);
            var fileUrl6 = "";
            if (model.File6 is not null && model.File6.Length > 0)
                fileUrl6 = await _fileUploadService.GetUploadUrlAsync(model.File6);

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
            parameter.Add("@Statements", "");
            parameter.Add("@Evidence1", fileUrl1);
            parameter.Add("@Evidence2", fileUrl2);
            parameter.Add("@Evidence3", fileUrl3);
            parameter.Add("@Evidence4", fileUrl4);
            parameter.Add("@Evidence5", fileUrl5);
            parameter.Add("@Evidence6", fileUrl6);
            //parameter.Add("@DocumentReview1", model.DocumentReview1);
            //parameter.Add("@DocumentReview2", model.DocumentReview2);
            //parameter.Add("@DocumentReview3", model.DocumentReview3);
            //parameter.Add("@DocumentReview4", model.DocumentReview4);
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
