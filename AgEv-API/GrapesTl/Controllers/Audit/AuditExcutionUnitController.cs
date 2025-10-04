namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class AuditExcutionUnitController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;



    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpGet("ListByBranch")]
    public async Task<IActionResult> ListByBranch()
    {
        try
        {

            var data = await _unitOfWork.SP_Call.List<AuditExcutionUnitView>("AuditExcutionUnitGetByBranch");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpGet("ListByRegion")]
    public async Task<IActionResult> ListByRegion()
    {
        try
        {

            var data = await _unitOfWork.SP_Call.List<AuditExcutionUnitView>("AuditExcutionUnitGetByRegion");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("CloseByUser")]
    public async Task<IActionResult> CloseByUser()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<AuditExcutionUnitView>("AuditCreationGetCloseByUser", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    //[HttpGet("Select")]
    //public async Task<IActionResult> Select()
    //{
    //    try
    //    {
    //        _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
    //        var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
    //        var parameter = new DynamicParameters();
    //        parameter.Add("@EmployeeId", user.EmployeeId);

    //        var data = await _unitOfWork.SP_Call.List<AuditExcutionUnit>("AuditCreationGetByUser", parameter);
    //        return Ok(data.Select(a => new { listId = a.AuditId, listName = a.AuditName }));
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //       "Error retrieve list of data." + e.Message);
    //    }
    //}

    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpGet("Details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


            var parameter = new DynamicParameters();
            parameter.Add("@ExcutionId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<AuditExcutionUnitView>("AuditExcutionGetById", parameter);

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
    [HttpGet("DetailsRegion/{id}")]
    public async Task<IActionResult> DetailsRegion(string id)
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
    public async Task<IActionResult> Update([FromForm] AuditExcutionUnit model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


            var parameter = new DynamicParameters();
            parameter.Add("@ExcutionId", model.ExcutionId);
            parameter.Add("@BmId", model.BmId);
            parameter.Add("@AmId", model.AmId);
            parameter.Add("@RmId", model.RmId);
            parameter.Add("@AuditStartDate", model.AuditStartDate);
            parameter.Add("@AuditEndDate", model.AuditEndDate);
            parameter.Add("@PeriodUnderAuditFrom", model.PeriodUnderAuditFrom);
            parameter.Add("@PeriodUnderAuditTill", model.PeriodUnderAuditTill);
            parameter.Add("@LastAuditPeriod", model.LastAuditPeriod);
            parameter.Add("@AuditNotification", model.AuditNotification);
            parameter.Add("@AuditObjectives", model.AuditObjectives);
            parameter.Add("@FirstLoanDisbursementDate", model.FirstLoanDisbursementDate);
            parameter.Add("@ParDateOfAudit", model.ParDateOfAudit);
            parameter.Add("@NumberOfBorrowersAudit", model.NumberOfBorrowersAudit);
            parameter.Add("@TotalNumberOfBranchStaff", model.TotalNumberOfBranchStaff);
            parameter.Add("@PriorFraudReport", model.PriorFraudReport);
            parameter.Add("@StaffTurnover", model.StaffTurnover);
            parameter.Add("@RevenueOfTheBranchLastMonth", model.RevenueOfTheBranchLastMonth);
            parameter.Add("@ProfitOfTheBranchLastMonth", model.ProfitOfTheBranchLastMonth);
            //parameter.Add("@Details", OperationConstant.AuditCreationUpdate);
            //parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditExcutionUnitUpdate", parameter);
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


    [HttpGet("SelectLoanOfficer")]
    public async Task<IActionResult> SelectLoanOfficer()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("AuditLOGetForSelect");
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectBranchManager/{id}")]
    public async Task<IActionResult> SelectBranchManager(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@ExcutionId", id);

            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("AuditBMGetForSelectByBranch", parameter);
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectAreaManager")]
    public async Task<IActionResult> SelectAreaManager()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("AuditAMGetForSelect");
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SelectRegionalManager")]
    public async Task<IActionResult> SelectRegionalManager()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpForSelect>("AuditRMGetForSelect");
            return Ok(data.Select(a => new { listId = a.EmployeeId, listName = a.EmployeePin + " - " + a.EmployeeName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpPost("Close/{id}")]
    public async Task<IActionResult> Close(string id)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


            var parameter = new DynamicParameters();
            parameter.Add("@AuditId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditCreationClose", parameter);
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
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


            var parameter = new DynamicParameters();
            parameter.Add("@ExcutionId", id);
            //parameter.Add("@Details", OperationConstant.AuditCreationDelete);
            //parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditExcutionUnitDelete", parameter);

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


    [Authorize(Roles = "Super Admin,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
    [HttpPost("UpdateRegion")]
    public async Task<IActionResult> UpdateRegion([FromForm] AuditExcutionUnit model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;


            var parameter = new DynamicParameters();
            parameter.Add("@ExcutionId", model.ExcutionId);
            parameter.Add("@BmId", model.BmId);
            parameter.Add("@AmId", model.AmId);
            parameter.Add("@RmId", model.RmId);
            parameter.Add("@AuditStartDate", model.AuditStartDate);
            parameter.Add("@AuditEndDate", model.AuditEndDate);
            parameter.Add("@PeriodUnderAuditFrom", model.PeriodUnderAuditFrom);
            parameter.Add("@PeriodUnderAuditTill", model.PeriodUnderAuditTill);
            parameter.Add("@LastAuditPeriod", model.LastAuditPeriod);
            parameter.Add("@AuditNotification", model.AuditNotification);
            parameter.Add("@AuditObjectives", model.AuditObjectives);
            parameter.Add("@FirstLoanDisbursementDate", model.FirstLoanDisbursementDate);
            parameter.Add("@ParDateOfAudit", model.ParDateOfAudit);
            parameter.Add("@NumberOfBorrowersAudit", model.NumberOfBorrowersAudit);
            parameter.Add("@TotalNumberOfBranchStaff", model.TotalNumberOfBranchStaff);
            parameter.Add("@PriorFraudReport", model.PriorFraudReport);
            parameter.Add("@StaffTurnover", model.StaffTurnover);
            parameter.Add("@RevenueOfTheBranchLastMonth", model.RevenueOfTheBranchLastMonth);
            parameter.Add("@ProfitOfTheBranchLastMonth", model.ProfitOfTheBranchLastMonth);
            //parameter.Add("@Details", OperationConstant.AuditCreationUpdate);
            //parameter.Add("@OperationBy", _userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("AuditExcutionUnitUpdate", parameter);
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
