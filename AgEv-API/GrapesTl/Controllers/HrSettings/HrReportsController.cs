namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,HR Manager,HR Executive,Accounts Manager,Accounts Executive, Country Team Lead,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations")]
[Route("api/[controller]")]
[ApiController]
public class HrReportsController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;


    [HttpGet("List")]
    public async Task<IActionResult> List()
    {

        try
        {
            var data = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmployeeGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Resign/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Resign([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmpResignGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Probation/{id}")]
    public async Task<IActionResult> Probation(int id)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Days", id);

            var data = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrProbationGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("New/{fromDate}/{tillDate}")]
    public async Task<IActionResult> New([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmployeeGetAllNewJoin", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("MonthlyStaff/{fromDate}/{tillDate}")]
    public async Task<IActionResult> MonthlyStaff([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<Position>("hrEmployeeGetAllMonthlyStaff", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("EmployeeByCategory/{branchId}/{departmentId}/{designationId}")]
    public async Task<IActionResult> EmployeeByCategory([FromRoute] string branchId, [FromRoute] string departmentId, [FromRoute] string designationId)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@branchId", branchId);
            parameter.Add("@departmentId", departmentId);
            parameter.Add("@designationId", designationId);

            var data = await _unitOfWork.SP_Call.List<EmployeeGetAllView>("hrEmployeeGetAllByCategory", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("NoticeReadById/{id}")]
    public async Task<IActionResult> NoticeReadById(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@NoticeId", id);

            var data = await _unitOfWork.SP_Call.List<NoticeReadById>("hrNoticeReadGetById", parameter);

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

    [HttpGet("Birthday/{month}")]
    public async Task<IActionResult> Birthday(string month)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Month", month);

            var data = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmployeeGetAllBirthday", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Tenure")]
    public async Task<IActionResult> Tenure()
    {

        try
        {
            var data = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmployeeGetAllTenure");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Leave/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Leave([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<EmpLeaveView>("hrEmpLeaveGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("AdvanceSalary/{fromDate}/{tillDate}")]
    public async Task<IActionResult> AdvanceSalary([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<EmpAdvanceView>("hrEmpAdvanceSalaryGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("TimeLogSummery/{fromDate}/{tillDate}")]
    public async Task<IActionResult> TimeLogSummery([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<EmpTimeSummery>("hrEmpTimeLogSummeryGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("TimeLogCard/{search}/{taskMonth}/{taskYear}")]
    public async Task<IActionResult> TimeLogCard([FromRoute] string search, [FromRoute] string taskMonth, [FromRoute] string taskYear)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Search", search);
            parameter.Add("@TaskMonth", taskMonth);
            parameter.Add("@TaskYear", taskYear);

            var data = await _unitOfWork.SP_Call.List<EmpTimeSummeryView>("hrEmpTimeLogCardGetBySearch", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("DisciplinaryLetter/{fromDate}/{tillDate}")]
    public async Task<IActionResult> DisciplinaryLetter([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<EmpDisciplinaryLetterView>("hrEmpDisciplinaryLetterGetAllIssue", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("LeaveBalance")]
    public async Task<IActionResult> LeaveBalance()
    {

        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpLeavebookView>("hrEmpLeaveBookGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("EmpMonthlyPosition")]
    public async Task<IActionResult> EmpMonthlyPosition()
    {

        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpMonthlyPosition>("HrMonthlyCalculate");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Transfer/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Transfer([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<EmpTransferView>("hrEmpTransferGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Promotion/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Promotion([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<EmpPromotionView>("hrEmpPromotionGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Demotion/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Demotion([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<EmpDemotionView>("hrEmpDemotionGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("History/{fromDate}/{tillDate}")]
    public async Task<IActionResult> History([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<EmpHistoryView>("hrEmpHistoryGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Letter/{id}")]
    public async Task<IActionResult> Letter(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<EmployeeGetAll>("hrEmployeeGetLetterById", parameter);

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

    [HttpGet("BasicInfo")]
    public async Task<IActionResult> BasicInfo()
    {

        try
        {
            var data = await _unitOfWork.SP_Call.List<Position>("hrEmployeePositionBasicInfo");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("DepartmentInfo")]
    public async Task<IActionResult> DepartmentInfo()
    {

        try
        {
            var data = await _unitOfWork.SP_Call.List<Position>("hrEmployeePositionDepartment");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("DesignationInfo")]
    public async Task<IActionResult> DesignationInfo()
    {

        try
        {
            var data = await _unitOfWork.SP_Call.List<Position>("hrEmployeePositionDesignation");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SalaryInfo")]
    public async Task<IActionResult> SalaryInfo()
    {

        try
        {
            var data = await _unitOfWork.SP_Call.List<Position>("hrEmployeePositionSalaryInfo");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Search/{id}")]
    public async Task<IActionResult> Search(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Search", id);

            var data = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmployeeGetBySearch", parameter);

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

    [HttpGet("DetailsById/{id}")]
    public async Task<IActionResult> DetailsById(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", id);

            var employee = await _unitOfWork.SP_Call.OneRecord<EmployeeGetViewById>("hrEmployeeGetViewById", parameter);
            if (employee == null)
                return NotFound(SD.Message_NotFound);

            var transfer = await _unitOfWork.SP_Call.List<EmpTransferView>("hrEmpTransferGetById", parameter);
            var promotion = await _unitOfWork.SP_Call.List<EmpPromotionView>("hrEmpPromotionGetById", parameter);
            var interview = await _unitOfWork.SP_Call.List<EmpInterview>("hrEmpInterviewById", parameter);

            return Ok(new EmployeeHistory { Employee = employee, Transfer = transfer, Promotion = promotion, Interview = interview });
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve details data." + e.Message);
        }
    }

    [HttpGet("MonthlyEmpolyee/{fromDate}/{tillDate}")]
    public async Task<IActionResult> MonthlyEmpolyee([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@fromDate", fromDate);
            parameter.Add("@tillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrMonthlyEmployeeStaff", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("AuditTrail/{fromDate}/{tillDate}")]
    public async Task<IActionResult> AuditTrail([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@fromDate", fromDate);
            parameter.Add("@tillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<AuditTrail>("AdAuditTrailGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("ActiveEmployee/{tillDate}")]
    public async Task<IActionResult> ActiveEmployee([FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<EmployeeGetAll>("HrEmpActiveEmployeeList", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }
}
