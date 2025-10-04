namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AuditPlanController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    private string _userId;


    [Authorize]
    [HttpGet("MaterList")]
    public async Task<IActionResult> MaterList()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.OneRecord<AuditPlanMaster>("AuditPlanMasterGetAll");

            if (data == null)
                return NotFound(SD.Message_NotFound);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize]
    [HttpGet("DetailsList")]
    public async Task<IActionResult> DetailsList()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<AuditPlanDetails>("AuditPlanDetailsGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize]
    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@PlanDetailsId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AuditPlanDetails>("AuditPlanDetailsGetById", parameter);

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
    [HttpPost("Create")]
    public async Task<IActionResult> Create([FromBody] AuditPlanDetailsAdd model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@BranchId", model.BranchId);
            parameter.Add("@PlanMasterId", model.PlanMasterId);
            parameter.Add("@Fraud", model.Fraud);
            parameter.Add("@StaffTurnover", model.StaffTurnover);
            parameter.Add("@InherentRisk", model.InherentRisk);
            parameter.Add("@ResidualRisk", model.ResidualRisk);
            parameter.Add("@OverallRiskRating", model.OverallRiskRating);
            parameter.Add("@SelectedForAuditPeriod", model.SelectedForAuditPeriod);
            parameter.Add("@Budget", model.Budget);
            parameter.Add("@EmployeeId", user.EmployeeId);



            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditPlanDetailsCreate", parameter);

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


    [Authorize]
    [HttpPost("Update")]
    public async Task<IActionResult> Update([FromBody] AuditPlanDetails model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@PlanDetailsId", model.PlanDetailsId);
            parameter.Add("@Fraud", model.Fraud);
            parameter.Add("@StaffTurnover", model.StaffTurnover);
            parameter.Add("@InherentRisk", model.InherentRisk);
            parameter.Add("@ResidualRisk", model.ResidualRisk);
            parameter.Add("@OverallRiskRating", model.OverallRiskRating);
            parameter.Add("@SelectedForAuditPeriod", model.SelectedForAuditPeriod);
            parameter.Add("@Budget", model.Budget);
            parameter.Add("@EmployeeId", user.EmployeeId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditPlanDetailsUpdate", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Already Approved, You can not modify")
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
    [HttpDelete("StatusUpdate/{id}")]
    public async Task<IActionResult> StatusUpdate(string id)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@AuditMasterId", id);
            parameter.Add("@ApprovedBy", user.FullName);
            //parameter.Add("@Details", OperationConstant.AuditPlaStatusUpdate);
            //parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditPlanStatusUpdate", parameter);

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
