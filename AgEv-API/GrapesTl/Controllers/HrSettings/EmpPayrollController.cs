namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,HR Manager,HR Executive, Accounts Manager, Accounts Executive, Country Team Lead")]
[Route("api/[controller]")]
[ApiController]
public class EmpPayrollController(IUnitOfWork unitOfWork, IMailSender mailSender, ILogger<EmployeeSetupController> logger) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMailSender _mailSender = mailSender;
    private readonly ILogger<EmployeeSetupController> _logger = logger;

    [HttpGet("CurrentOpenMonth")]
    public async Task<IActionResult> CurrentOpenMonth()
    {
        try
        {


            var data = await _unitOfWork.SP_Call.OneRecord<CurrentOpenMonth>("hrEmpCurrentOpenMonth");

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




    [HttpGet("SalaryAttendance/{fromDate}/{tillDate}")]
    public async Task<IActionResult> SalaryAttendance([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            var data = await _unitOfWork.SP_Call.List<EmpSalaryAttendance>("HrMonthlySalaryAttendance", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpGet("Bank/{salaryMonth}/{salaryYear}")]
    public async Task<IActionResult> Bank([FromRoute] string salaryMonth, [FromRoute] string salaryYear)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@salaryMonth", salaryMonth);
            parameter.Add("@salaryYear", salaryYear);

            var data = await _unitOfWork.SP_Call.List<EmpPayslip>("hrEmpPayrollGetAllBank", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Nssf/{salaryMonth}/{salaryYear}")]
    public async Task<IActionResult> Nssf([FromRoute] string salaryMonth, [FromRoute] string salaryYear)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@salaryMonth", salaryMonth);
            parameter.Add("@salaryYear", salaryYear);

            var data = await _unitOfWork.SP_Call.List<EmpPayslip>("hrEmpPayrollGetAllNssf", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Tax/{salaryMonth}/{salaryYear}")]
    public async Task<IActionResult> Tax([FromRoute] string salaryMonth, [FromRoute] string salaryYear)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@salaryMonth", salaryMonth);
            parameter.Add("@salaryYear", salaryYear);

            var data = await _unitOfWork.SP_Call.List<EmpPayslip>("hrEmpPayrollGetAllTax", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpPost("MonthStatus")]
    public async Task<IActionResult> MonthStatus()
    {

        try
        {
            var parameter = new DynamicParameters();

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrMounthCloseAndOpen", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Salary process pending")
                return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpPost("SalaryProcess")]
    public async Task<IActionResult> SalaryProcess()
    {

        try
        {
            var parameter = new DynamicParameters();

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("hrEmpPayrollSalaryProcess", parameter);

            var message = parameter.Get<string>("Message");

            //if (message == "Already Close")
            //    return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Salary/{salaryMonth}/{salaryYear}")]
    public async Task<IActionResult> Salary([FromRoute] string salaryMonth, [FromRoute] string salaryYear)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@salaryMonth", salaryMonth);
            parameter.Add("@salaryYear", salaryYear);

            var data = await _unitOfWork.SP_Call.List<EmpPayslip>("hrEmpPayrollGetAllSalary", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Payslip/{search}/{salaryMonth}/{salaryYear}")]
    public async Task<IActionResult> Payslip([FromRoute] string search, [FromRoute] string salaryMonth, [FromRoute] string salaryYear)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Search", search);
            parameter.Add("@SalaryMonth", salaryMonth);
            parameter.Add("@SalaryYear", salaryYear);

            var data = await _unitOfWork.SP_Call.List<EmpPayslip>("hrEmpPayrollGetBySearch", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("Sacco/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Sacco([FromRoute] DateTime fromDate,[FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmployeeGetAllSacco", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("SalaryStop")]
    public async Task<IActionResult> SalaryStop()
    {

        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpPayslip>("hrEmpPayrollGetAllSalaryStop");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpGet("StopSalaryPaid")]
    public async Task<IActionResult> StopSalaryPaid()
    {

        try
        {
            var data = await _unitOfWork.SP_Call.List<EmpPayslip>("hrEmpStopSalaryPaid");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpPost("EmailPayslip/{salaryMonth}/{salaryYear}")]
    public async Task<IActionResult> EmailPayslip([FromRoute] string salaryMonth, [FromRoute] string salaryYear)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {


            var parameter = new DynamicParameters();
            parameter.Add("@salaryMonth", salaryMonth);
            parameter.Add("@salaryYear", salaryYear);

            var employees = await _unitOfWork.SP_Call.List<EmpPayslip>("hrEmpPayrollGetAllPaySlip", parameter);

            if (employees is null)
                return NotFound();

            foreach (var employee in employees)
            {
                if (string.IsNullOrWhiteSpace(employee.Email) == false)
                {
                    try
                    {
                        var tmp = await _mailSender.SendEmailWithBody(
                            employee.Email,
                            employee.EmployeeName,
                            SD.BccEmail,
                            "Payslip for " + employee.SalaryMonthYear.ToString("MMM-yyyy"),
                            TableGeneration.PayslipTemplate(employee));
                    }
                    catch (Exception ex)
                    {
                        _logger.LogInformation("Remote work Error at: {ex}", ex.Message);
                    }
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
}
