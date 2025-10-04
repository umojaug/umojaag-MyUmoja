namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AuditExcutionRegionController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;


    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


            var parameter = new DynamicParameters();
            parameter.Add("@ExcutionId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AuditExcutionUnitView>("AuditExcutionRegionGetById", parameter);

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
    public async Task<IActionResult> Update([FromForm] AuditExcutionUnitRegion model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


            var parameter = new DynamicParameters();
            parameter.Add("@ExcutionId", model.ExcutionId);
            parameter.Add("@RmId", model.RmId);
            parameter.Add("@AuditStartDate", model.AuditStartDate);
            parameter.Add("@AuditEndDate", model.AuditEndDate);
            parameter.Add("@PeriodUnderAuditFrom", model.PeriodUnderAuditFrom);
            parameter.Add("@PeriodUnderAuditTill", model.PeriodUnderAuditTill);
            parameter.Add("@LastAuditPeriod", model.LastAuditPeriod);
            parameter.Add("@AuditNotification", model.AuditNotification);
            parameter.Add("@AuditObjectives", model.AuditObjectives);
            parameter.Add("@ParDateOfAudit", model.ParDateOfAudit);
            parameter.Add("@NumberOfBorrowersAudit", model.NumberOfBorrowersAudit);
            parameter.Add("@TotalNumberOfBranchStaff", model.TotalNumberOfBranchStaff);
            parameter.Add("@PriorFraudReport", model.PriorFraudReport);
            parameter.Add("@StaffTurnover", model.StaffTurnover);

            //parameter.Add("@Details", OperationConstant.AuditCreationUpdate);
            //parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditExcutionUnitRegionUpdate", parameter);
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
