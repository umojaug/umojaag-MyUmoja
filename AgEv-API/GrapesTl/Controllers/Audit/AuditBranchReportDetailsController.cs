namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
[Route("api/[controller]")]
[ApiController]
public class AuditBranchReportDetailsController(IUnitOfWork unitOfWork, IFileUploadService fileUploadService, IMailSender mailSender, ILogger<EmployeeSetupController> logger) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<EmployeeSetupController> _logger = logger;
    private readonly IFileUploadService _fileUploadService = fileUploadService;

    [HttpGet("List/{id}")]
    public async Task<IActionResult> List(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@ReportId", id);


            var data = await _unitOfWork.SP_Call.List<AuditBranchReportDetailsView>("AuditBranchReportDetailsGetAll", parameter);

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
            parameter.Add("@ReportDetailsId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AuditBranchReportDetailsView>("AuditBranchReportDetailsGetById", parameter);

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



    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromForm] AuditBranchReportDetails model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var fileUrl = "";
            if (model.File is not null && model.File.Length > 0)
                fileUrl = await _fileUploadService.GetUploadUrlAsync(model.File);

            var parameter = new DynamicParameters();
            parameter.Add("@ReportDetailsId", model.ReportDetailsId);
            parameter.Add("@AreaOfReviewId", model.AreaOfReviewId);
            parameter.Add("@DetailedAuditFinding", model.DetailedAuditFinding);
            parameter.Add("@PrimaryRootCauseId", model.PrimaryRootCauseId);
            parameter.Add("@RiskImplicationId", model.RiskImplicationId);
            parameter.Add("@Recommendations", model.Recommendations);
            parameter.Add("@ImplementedBy", model.ImplementedBy);
            parameter.Add("@RiskCategory", model.RiskCategory);
            parameter.Add("@BranchResponse", string.IsNullOrWhiteSpace(model.BranchResponse) == true ? "" : model.BranchResponse);
            parameter.Add("@ManagementResponse", string.IsNullOrWhiteSpace(model.ManagementResponse) == true ? "" : model.ManagementResponse);
            parameter.Add("@CommitmentDate", model.CommitmentDate);
            parameter.Add("@OverallControlsAssessment", model.OverallControlsAssessment);
            parameter.Add("@FraudRisk", model.FraudRisk);
            parameter.Add("@RepeatFinding", model.RepeatFinding);
            parameter.Add("@FollowUpCommentIfAny", model.FollowUpCommentIfAny);
            parameter.Add("@Appendicies", fileUrl);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditBranchReportDetailsUpdate", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Already exists")
                return BadRequest(message);

            var findEmployee = new DynamicParameters();
            findEmployee.Add("@EmployeeId", model.ImplementedBy);

            var data = await _unitOfWork.SP_Call.OneRecord<EmployeeGetById>("hrEmployeeGetById", findEmployee);

            // Audior Email come from AuditWorkplanUpdate message 
            if (string.IsNullOrWhiteSpace(data.Email) == false)
            {
                try
                {
                    var tmp = await _mailSender.SendEmailWithBody(
                        data.Email,
                        data.EmployeeName,
                        SD.BccEmail,
                        SD.AuditNotification,
                        $"Dear {data.EmployeeName}, You have an Audit notification.");
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

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@ReportId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditBranchReportDelete", parameter);

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
