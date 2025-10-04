namespace GrapesTl.Controllers;


[Authorize(Roles = "Super Admin,HR Manager,HR Executive,Accounts Manager,Accounts Executive, Country Team Lead")]
[Route("api/[controller]")]
[ApiController]
public class HrPdfCommonController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    [HttpGet("ActiveEmployee/{tillDate}")]
    public async Task<IActionResult> ActiveEmployee([FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            //parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var list = await _unitOfWork.SP_Call.List<EmployeeGetAll>("HrEmpActiveEmployeeList", parameter);

            var tableBody = new StringBuilder();




            tableBody.Append("<th style='border:  1px solid #000000; text-align: left; padding: 8px;'>Employee Id</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Joining Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Designation</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Contact Number</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Gross Salary</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeId}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BranchName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.JoiningDate:dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DesignationName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.ContactNumber}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.GrossSalary}</td>");
                tableBody.Append("</tr>");

            }


            var pdfBytes = TableGeneration.TableTemplate(9, "Active Employee List", tableBody);


            return File(pdfBytes, "application/pdf", "NewJoin.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("AdList/{fromDate}/{tillDate}")]
    public async Task<IActionResult> AdList([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var list = await _unitOfWork.SP_Call.List<EmpAllDedView>("hrEmpAllDedGetAll", parameter);

            var tableBody = new StringBuilder();
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Designation</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Allowance / Deduction Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Effective Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Amount</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Particulars</th>");
            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BranchName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DesignationName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.AllowanceDeductionName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.EffectiveDate}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.Amount}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.Particulars}</td>");
                tableBody.Append("</tr>");

               

            }


           

            var pdfBytes = TableGeneration.TableTemplate(9, "Emp Payroll Allowance Deduction List", tableBody);

            return File(pdfBytes, "application/pdf", "EmpPayrollAllDedList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("Advancesalary/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Advancesalary([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var list = await _unitOfWork.SP_Call.List<EmpAdvanceView>("hrEmpAdvanceSalaryGetAll", parameter);

            var tableBody = new StringBuilder();

            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Advance Amount</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Needed Advance Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Purpose Of Advance</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Advance Status</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Authority Name</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");

                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BranchName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DesignationName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.AdvanceAmount}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.NeededAdvanceDate:dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.PurposeOfAdvance}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.AdvanceStatus}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.AuthorityName}</td>");
                tableBody.Append("</tr>");
            }

            var pdfBytes = TableGeneration.TableTemplate(10, "Advance Salary List", tableBody);

            return File(pdfBytes, "application/pdf", "advancesalary.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("Attendance/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Attendance([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var list = await _unitOfWork.SP_Call.List<EmpAttendanceView>("hrEmpAttendanceGetByDate", parameter);

            var tableBody = new StringBuilder();





            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Attendance Id</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Work Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Atten Status</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Particulars</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Manual Entry</th>");
            tableBody.Append("</tr>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end


            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");

                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmpAttendanceId}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BranchName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DesignationName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.WorkDate:dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.AttenStatus}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Particulars}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.ManualEntry}</td>");
                tableBody.Append("</tr>");

            }


            var pdfBytes = TableGeneration.TableTemplate(10, "Attendance List", tableBody);

            return File(pdfBytes, "application/pdf", "attendance.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("AuditPlanDetailsList")]
    public async Task<IActionResult> AuditPlanDetailsList()
    {
        try
        {
            var list = await _unitOfWork.SP_Call.List<AuditPlanDetails>("AuditPlanDetailsGetAll");

            var tableBody = new StringBuilder();
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Details</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Portfolio Value</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>PAR</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Fraud</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Staff Turn Over</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Number Of Borrowers</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Inherent Risk</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Residual Risk</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Weightage</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Overall Risk Rating</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Selected For Audit Period</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Budget</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BusinessArea}, {item.AURef} , {item.AUName} , {item.AuditType}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.PortfolioValue}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Par}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Fraud}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.StaffTurnover}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.NumOfBorrower}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.InherentRisk}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.ResidualRisk}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Weightage}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.OverallRiskRating}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.SelectedForAuditPeriod}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Budget}</td>");
                tableBody.Append("</tr>");

            }

            var pdfBytes = TableGeneration.TableTemplate(12, "Auditplan List", tableBody);

            return File(pdfBytes, "application/pdf", "Auditplanlist.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
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


            var tableBody = new StringBuilder();


            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Task Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Entry By</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Entry Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Update Date</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end


            foreach (var item in data)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.TaskName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EntryBy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EntryDate:dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.UpdateDate:dd/MM/yyyy}</td>");

                tableBody.Append("</tr>");
            }

            var pdfBytes = TableGeneration.TableTemplate(6, "Audit Trail List", tableBody);


            return File(pdfBytes, "application/pdf", "employees.pdf");
        }
        catch (Exception e)
        {

            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("Birthday/{month}")]
    public async Task<IActionResult> Birthday(string month)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Month", month);

            var list = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmployeeGetAllBirthday", parameter);

            var tableBody = new StringBuilder();
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Joining Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Designation</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Contact Number</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Birthday</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BranchName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.JoiningDate:dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.ContactNumber}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.DateOfBirth:dd/MM/yyyy}</td>");
                tableBody.Append("</tr>");

            }

            var pdfBytes = TableGeneration.TableTemplate(8, "Birthday List", tableBody);

            return File(pdfBytes, "application/pdf", "BirthdayList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("CVBank")]
    public async Task<IActionResult> CVBank()
    {
        try
        {
            var parameter = new DynamicParameters();

            var list = await _unitOfWork.SP_Call.List<CvBanKView>("HrCvBankGetAll", parameter);

            var tableBody = new StringBuilder();
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Company</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Candidate Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Email</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Opportunity type</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.CompanyName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.FullName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Email}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.JobType}</td>");
                tableBody.Append("</tr>");
            }

            var pdfBytes = TableGeneration.TableTemplate(5, "CV Bank", tableBody);
            //var pdfBytes = TableTemplate(5, "CVBank", tableBody);

            return File(pdfBytes, "application/pdf", "CV Bank.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
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

            var list = await _unitOfWork.SP_Call.List<EmpDemotionView>("hrEmpDemotionGetAll", parameter);

            var tableBody = new StringBuilder();

            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pre Designation</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pre Gross Salary Usd</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pre Gross Salary </th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Effective Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gross Salary Usd</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gross Salary</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Particulars</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.PreDesignation}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.PreGrossSalaryUsd}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.PreGrossSalary}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EffectiveDate:dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BranchName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DesignationName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.GrossSalaryUsd}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.GrossSalary}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.Particulars}</td>");
                tableBody.Append("</tr>");

            }

            var pdfBytes = TableGeneration.TableTemplate(12, "Demotion List", tableBody);

            return File(pdfBytes, "application/pdf", "DemotionList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
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

            var list = await _unitOfWork.SP_Call.List<EmpDisciplinaryLetterView>("hrEmpDisciplinaryLetterGetAllIssue", parameter);

            var tableBody = new StringBuilder();

            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Designation</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Letter Type</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Issue Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Subject</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BranchName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DesignationName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.LetterType}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.IssueDate:dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.Title}</td>");
                tableBody.Append("</tr>");

            }

            var pdfBytes = TableGeneration.TableTemplate(8, "Disciplinary Letter Issue List", tableBody);

            return File(pdfBytes, "application/pdf", "DisciplinaryLetterIssueList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("EmpMonthlyPosition")]
    public async Task<IActionResult> EmpMonthlyPosition()
    {
        try
        {

            var employees = await _unitOfWork.SP_Call.List<EmpMonthlyPosition>("HrMonthlyCalculate");


            var tableBody = new StringBuilder();


            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Country</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Salary Year </th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Salary Month</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Female</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Male</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Not To Say</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>New Join</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Country Resign</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var employee in employees)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{employee.Country}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{employee.SalaryYear}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{employee.SalaryMonth}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{employee.Female}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{employee.Male}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{employee.NotToSay}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{employee.NewJoin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{employee.CountResign}</td>");
                tableBody.Append("</tr>");
            }

            var pdfBytes = TableGeneration.TableTemplate(8, "Employee Monthly Position List", tableBody);


            return File(pdfBytes, "application/pdf", "employees.pdf");
        }
        catch (Exception e)
        {

            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("ExitInterview/{id}")]
    public async Task<IActionResult> ExitInterview(string id)
    {
        try
        {

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", id);

            var employees = await _unitOfWork.SP_Call.OneRecord<EmpResignDetails>("HrEmpExitInterview", parameter);

            // Define the CalculateMonths method
            int CalculateMonths(DateTime start, DateTime end)
            {
                return ((end.Year - start.Year) * 12) + end.Month - start.Month;
            }

            // Calculate the months served
            int monthsServed = CalculateMonths(employees.JoiningDate, employees.UpdateDate);


            var sb = new StringBuilder();
            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='8'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img  padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");
            sb.Append("</tr>");

            sb.Append("<tr>");



            sb.Append("</tr>");

            sb.Append("</thead>");
            sb.Append("<tbody>");



            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("<br/><br/>");

            sb.Append("<h2 style=' text-align: center; padding-top: 8px;' >STAFF EXIT SURVEY</h2>");
            sb.Append("<h3 style=' text-align: center;'>Please brief the outgoing /Ex-staffs, purpose of this survey before start</h3>");

            sb.Append("<h3 style='margin-top: 2px; font-weight: bold;'>Instructions:</h3>");
            sb.Append("<p>Please fill in the form completely and answer all the questions honestly to achieve the objective of the management to facilitate better services to all. Please do not hesitate to provide the required information as matters will be kept confidential.</p>");
            sb.Append("<p>Preferred Area of Action Research: professional growth, work safety, salary & benefits, supervisory role, office culture/environment</p>");



            sb.Append($@"
              <p style='margin-top: 20px; line-height: 1.5;'>
                  PIN: {employees.EmployeePin}<br/>
               <strong>{employees.EmployeeName}</strong><br/>
                       {employees.DesignationName}
              </p>");

            sb.Append($"<p>{employees.JoiningDate.ToString("dd/MMM/yyyy")}</p>");

            sb.Append("<form style='margin-top: 20px;>");
            sb.Append("<label for='reasonOfLeaving'>1. Reason of leaving (more than one reason may be given if appropriate):</label>");
            sb.Append("<br/><br/>");


            sb.Append(@"
<div style='display: flex;'>
    <div style=' padding-right: 20px;'>
        <p style='margin-top: 10px;'>");

            if (employees.BetterOffer == 0)
            {
                sb.Append("<input type='checkbox' /> Took another job/better offer<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Took another job/better offer<br/>");
            }

            if (employees.SalaryPackage == 0)
            {
                sb.Append("<input type='checkbox' /> Dissatisfaction with salary package<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Dissatisfaction with salary package<br/>");
            }

            if (employees.FamilyNeed == 0)
            {
                sb.Append("<input type='checkbox' /> Pregnancy/home/family need<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Pregnancy/home/family need<br/>");
            }

            if (employees.TypeOfWork == 0)
            {
                sb.Append("<input type='checkbox' /> Dissatisfaction with type of work<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Dissatisfaction with type of work<br/>");
            }

            if (employees.CareerPath == 0)
            {
                sb.Append("<input type='checkbox' /> Dissatisfaction with career path<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Dissatisfaction with career path<br/>");
            }

            if (employees.Disability == 0)
            {
                sb.Append("<input type='checkbox' /> Poor health/physical/disability<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Poor health/physical/disability<br/>");
            }

            if (employees.Supervisor == 0)
            {
                sb.Append("<input type='checkbox' /> Dissatisfaction with supervisor<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Dissatisfaction with supervisor<br/>");
            }

            sb.Append(@"
        </p>
    </div>

    <div>
        <p style='margin-top: 10px;'>");

            if (employees.Relocation == 0)
            {
                sb.Append("<input type='checkbox' /> Relocation to another city<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Relocation to another city<br/>");
            }

            if (employees.Colleagues == 0)
            {
                sb.Append("<input type='checkbox' /> Dissatisfaction with co-workers<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Dissatisfaction with co-workers<br/>");
            }

            if (employees.Travel == 0)
            {
                sb.Append("<input type='checkbox' /> Travel difficulties<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Travel difficulties<br/>");
            }

            if (employees.WorkingConditions == 0)
            {
                sb.Append("<input type='checkbox' /> Dissatisfactory working conditions<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Dissatisfactory working conditions<br/>");
            }

            if (employees.Education == 0)
            {
                sb.Append("<input type='checkbox' /> To attend further education<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> To attend further education<br/>");
            }

            if (employees.Benefits == 0)
            {
                sb.Append("<input type='checkbox' /> Dissatisfaction with benefits package<br/>");
            }
            else
            {
                sb.Append("<input type='checkbox' checked /> Dissatisfaction with benefits package<br/>");
            }

            sb.Append($"<p style='font-weight: bold; text-align: center;'> Others (please specify):{employees.OtherReason} </p><br/> <br/>");

            sb.Append(@"
        </p>
    </div>
</div>");




            sb.Append("<label for='monthsServed'>2. How long have you served Umoja micro finance (write in months)</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {monthsServed}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");


            sb.Append("<label for='sharedDesire'>3. Did you share your desire to leave the company/concerns with immediate supervisor prior to leaving?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.InformSupervisor}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='constructiveFeedback'>4. Did you receive constructive feedback to help improve your situation?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.Feedback}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='resources'>5. How easy was it to get the resources (office equipment, transport, security, cell phone, etc.) you needed to do your job well?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.Resources}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='professionalGrowth'>6. How helpful was your position here in stimulating your professional growth?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.Growth}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='pay'>7. How well were you paid here for the work you did?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.Payment}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='recognition'>8. How often did you feel your contributions were recognized?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans:{employees.Recognized}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='decisions'>9. How reasonable were decisions (e.g., work load distribution, leave acceptance, recommend for promotion, etc.) made by your supervisor?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.Decisions}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='voicingOpinion'>10. How comfortable did you feel voicing your opinion? (e.g., opinion on change of process, product, new ideas, etc.)</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans:{employees.Voicing}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='supervisorTreatment'>11. How well did your supervisor treat you? (e.g., common behavior, praising good work, health discussion, handling mistakes professionally, etc.)</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.Treat}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='coWorkers'>12. How much did you like your co-workers?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.coworkers}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='teamwork'>13. How did the members of your team work together?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans:{employees.teamMembers}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='stress'>14. In a typical week, how often did you feel stressed at work?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.stressed}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='workLifeBalance'>15. How difficult was it for you to balance your work and personal life while working here?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.WorkBalance}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='workPlaceSafety'>16. How safe did you feel here at your work place?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.SafePlace}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='workEnvironment'>17. Overall, how was your work environment?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.Environment}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='recommendation'>18. If you had a friend looking for a job, would you recommend us?</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.RecommendUs}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("<label for='comments'>19. Any other comments or concerns, please feel free to write here.</label>");
            sb.Append("<br/><br/>");
            sb.Append($"<label for='monthsServed'>Ans: {employees.Comments}</label>");
            sb.Append("<br/><br/>");
            sb.Append("<br/><br/>");

            sb.Append("</form>");

            sb.Append("<h4>We express our sincere gratitude for your invaluable participation and time.</h4>");

            var htmlContent = sb.ToString();


            var htmlToPdf = new HtmlToPdfConverter();

            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);


            return File(pdfBytes, "application/pdf", "employees.pdf");
        }
        catch (Exception e)
        {

            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("History/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Histroy([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var list = await _unitOfWork.SP_Call.List<EmpHistoryView>("hrEmpHistoryGetAll", parameter);

            var tableBody = new StringBuilder();

            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin, Employee Status</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name, Pre Branch</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pre Department, Pre Designation</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pre Gross Salary Usd, Pre Gross Salary</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Effective Date, Branch Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department Name, Designation Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gross Salary Usd, Gross Salary</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Particulars</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}, {item.EmpStatus}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}, {item.PreBranch}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.PreDepartment}, {item.PreDesignation}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.PreGrossSalaryUsd}, {item.PreGrossSalary}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EffectiveDate:dd/MM/yyyy},{item.BranchName} </td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DepartmentName}, {item.DesignationName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.GrossSalaryUsd}, {item.GrossSalary}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Particulars}</td>");
                tableBody.Append("</tr>");

            }

            var pdfBytes = TableGeneration.TableTemplate(8, "Transfer List", tableBody);

            return File(pdfBytes, "application/pdf", "TransferList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("JobsList")]
    public async Task<IActionResult> JobsList()
    {
        try
        {
            var parameter = new DynamicParameters();

            var list = await _unitOfWork.SP_Call.List<ApplyJobView>("hrJobApplyGetAll", parameter);

            var tableBody = new StringBuilder();
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Company</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Job Title</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Full Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Email</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Phone</th>");
            //tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Feedback</th>");
            //tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Decline</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.CompanyName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Title}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.FullName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Email}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Phone}</td>");
                tableBody.Append("</tr>");
            }
            var pdfBytes = TableGeneration.TableTemplate(6, "Jobs List", tableBody);
            //var pdfBytes = TableTemplate(6, "JobsList", tableBody);

            return File(pdfBytes, "application/pdf", "Jobs List.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
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

            var list = await _unitOfWork.SP_Call.List<EmpLeaveView>("hrEmpLeaveGetAll", parameter);

            var tableBody = new StringBuilder();


            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Leave Id</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Leave Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Form Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Till Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Particulars</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Leave Status</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Authority Name</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end


            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmpLeaveId}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BranchName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DesignationName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.LeaveName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.FromDate:dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.TillDate:dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Particulars}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.LeaveStatus}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.AuthorityName}</td>");
                tableBody.Append("</tr>");

            }


            var pdfBytes = TableGeneration.TableTemplate(12, "Leave List", tableBody);

            return File(pdfBytes, "application/pdf", "Leave.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("Leavebalance")]
    public async Task<IActionResult> Leavebalance()
    {
        try
        {
            var list = await _unitOfWork.SP_Call.List<EmpLeavebookView>("hrEmpLeaveBookGetAll");

            var tableBody = new StringBuilder();

            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name </th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");

            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Ale</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Al</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Comp</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Mtl</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pat</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Sl</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Stu</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end


            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");

                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BranchName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");

                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DesignationName}</td>");

                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.Ale}</td>");

                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.Al}</td>");

                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.Comp}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.Mtl}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.Pat}</td>");

                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.Sl}</td>");

                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.Stu}</td>");

                tableBody.Append("</tr>");

            }


            var pdfBytes = TableGeneration.TableTemplate(12, "Leave Balance List", tableBody);

            return File(pdfBytes, "application/pdf", "leavebalance.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("List")]
    public async Task<IActionResult> List()
    {
        try
        {

            var list = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmployeeGetAll");

            var tableBody = new StringBuilder();
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch, Department</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pin, Designation </th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>DOB, Gender</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Joining Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Contact Number</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Gross Salary</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BranchName}, {item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}, {item.DesignationName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DateOfBirth:dd/MM/yyyy}, {item.Gender}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.JoiningDate::dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.ContactNumber}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.GrossSalary}</td>");
                tableBody.Append("</tr>");

            }

            var pdfBytes = TableGeneration.TableTemplate(7, "Employee List", tableBody);

            return File(pdfBytes, "application/pdf", "EmployeeList.pdf");
        }
        catch (Exception e)
        {

            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("MonthlyEmpolyee/{fromDate}/{tillDate}")]
    public async Task<IActionResult> MonthlyEmpolyee([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var list = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrMonthlyEmployeeStaff", parameter);

            var tableBody = new StringBuilder();

            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Salary Year Month</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name, Department Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin, Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Date Of Birth</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation, Joining Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gender</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Contact Number</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gross Salary, Gross Salary Usd</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Email</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end


            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.SalaryYearMonth}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BranchName}, {item.DepartmentName} </td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}, {item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DateOfBirth:dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DesignationName}, {item.JoiningDate:dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Gender}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.ContactNumber}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.GrossSalary}, {item.GrossSalaryUsd}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Email}</td>");
                tableBody.Append("</tr>");

            }


            var pdfBytes = TableGeneration.TableTemplate(8, "Monthly Employee List", tableBody);

            return File(pdfBytes, "application/pdf", "MonthlyEmployee.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
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

            var list = await _unitOfWork.SP_Call.List<Position>("hrEmployeeGetAllMonthlyStaff", parameter);

            var tableBody = new StringBuilder();



            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>General Statistics</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Details</th>");


            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end


            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");

                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Title}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.StaffCount}</td>");



                tableBody.Append("</tr>");

            }

            var pdfBytes = TableGeneration.TableTemplate(8, "Salary Attendance List", tableBody);

            return File(pdfBytes, "application/pdf", "salaryattendance.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
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

            var list = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmployeeGetAllNewJoin", parameter);

            var tableBody = new StringBuilder();
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Joining Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Designation</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Contact Number</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Gross Salary</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BranchName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.JoiningDate:dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DesignationName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.ContactNumber}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.GrossSalary}</td>");
                tableBody.Append("</tr>");

            }

            var pdfBytes = TableGeneration.TableTemplate(9, "New Join List", tableBody);

            return File(pdfBytes, "application/pdf", "NewJoin.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("NoticeReadById/{id}")]
    public async Task<IActionResult> NoticeReadById(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@NoticeId", id);

            var list = await _unitOfWork.SP_Call.List<NoticeReadById>("hrNoticeReadGetById", parameter);

            var noticeTitle = list.FirstOrDefault()?.Title ?? "Notice List"; // Fetch dynamic title
            var tableBody = new StringBuilder();

            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Read Date Time</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BranchName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DesignationName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.ReadDateTime:dd/MM/yyyy}</td>");
                tableBody.Append("</tr>");

            }

            var pdfBytes = TableGeneration.TableTemplate(6, noticeTitle, tableBody);

            return File(pdfBytes, "application/pdf", "NoticeList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
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

            var list = await _unitOfWork.SP_Call.List<EmpPromotionView>("hrEmpPromotionGetAll", parameter);

            var tableBody = new StringBuilder();
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pre Designation</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pre Gross Salary Usd</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pre Gross Salary </th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Effective Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gross Salary Usd</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gross Salary</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Particulars</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.PreDesignation}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.PreGrossSalaryUsd}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.PreGrossSalary}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EffectiveDate:dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BranchName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DesignationName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.GrossSalaryUsd}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.GrossSalary}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.Particulars}</td>");
                tableBody.Append("</tr>");

            }

            var pdfBytes = TableGeneration.TableTemplate(12, "Promotion List", tableBody);

            return File(pdfBytes, "application/pdf", "PromotionList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
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

            var list = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmpResignGetAll", parameter);

            var tableBody = new StringBuilder();

            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Joining Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Contact Number</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Email</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Resign Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Resign Reason</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Particulars</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BranchName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.JoiningDate:dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DesignationName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.ContactNumber}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Email}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.ResignDate:dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.ResignReasonName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Particulars}</td>");
                tableBody.Append("</tr>");

            }

            var pdfBytes = TableGeneration.TableTemplate(11, "Resign List", tableBody);

            return File(pdfBytes, "application/pdf", "ResignList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("ResignDetails/{id}")]
    public async Task<IActionResult> ResignDetails(string id)
    {
        try
        {

            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", id);

            var employees = await _unitOfWork.SP_Call.OneRecord<EmpResignDetails>("HrEmpExitInterview", parameter);

            // Define the CalculateMonths method
            int CalculateMonths(DateTime start, DateTime end)
            {
                return ((end.Year - start.Year) * 12) + end.Month - start.Month;
            }

            // Calculate the months served
            int monthsServed = CalculateMonths(employees.JoiningDate, employees.UpdateDate);


            var tableBody = new StringBuilder();
            tableBody.Append("<table style='width: 100%; border-collapse: collapse; font-family: Times New Roman;'>");
            tableBody.Append("<thead style='display: table-header-group;'>");

            tableBody.Append("<tr>");
            tableBody.Append("<th colspan='8'>");
            tableBody.Append("<table style='width: 100%'>");

            tableBody.Append("<tbody>");

            tableBody.Append("<tr>");
            tableBody.Append("<td style='text-align: center;'>");
            tableBody.Append("<img  padding: 3px' src='" + SD.ReportImageUrl + "'/>");
            tableBody.Append("</td >");
            tableBody.Append("</tr>");
            tableBody.Append("<tr>");
            tableBody.Append("</tr>");
            tableBody.Append("</tbody>");
            tableBody.Append("</table>");

            tableBody.Append("</th>");
            tableBody.Append("</tr>");

            tableBody.Append("<tr>");



            tableBody.Append("</tr>");

            tableBody.Append("</thead>");
            tableBody.Append("<tbody>");



            tableBody.Append("</tbody>");
            tableBody.Append("</table>");

            tableBody.Append("<br/><br/>");

            tableBody.Append("<h2 style=' text-align: center; padding-top: 8px;' >STAFF EXIT SURVEY</h2>");
            tableBody.Append("<h3 style=' text-align: center;'>Please brief the outgoing /Ex-staffs, purpose of this survey before start</h3>");

            tableBody.Append("<h3 style='margin-top: 2px; font-weight: bold;'>Instructions:</h3>");
            tableBody.Append("<p>Please fill in the form completely and answer all the questions honestly to achieve the objective of the management to facilitate better services to all. Please do not hesitate to provide the required information as matters will be kept confidential.</p>");
            tableBody.Append("<p>Preferred Area of Action Research: professional growth, work safety, salary & benefits, supervisory role, office culture/environment</p>");



            tableBody.Append($@"
              <p style='margin-top: 20px; line-height: 1.5;'>
                  PIN: {employees.EmployeePin}<br/>
               <strong>{employees.EmployeeName}</strong><br/>
                       {employees.DesignationName}
              </p>");

            tableBody.Append($"<p>{employees.JoiningDate.ToString("dd/MMM/yyyy")}</p>");

            tableBody.Append("<form style='margin-top: 20px;>");
            tableBody.Append("<label for='reasonOfLeaving'>1. Reason of leaving (more than one reason may be given if appropriate):</label>");
            tableBody.Append("<br/><br/>");


            tableBody.Append(@"<div style='display: flex;'> <div style=' padding-right: 20px;'><p style='margin-top: 10px;'>");

            if (employees.BetterOffer == 0)
            {
                tableBody.Append("<input type='checkbox' /> Took another job/better offer<br/>");
            }
            else
            {
                tableBody.Append("<input type='checkbox' checked /> Took another job/better offer<br/>");
            }

            if (employees.SalaryPackage == 0)
            {
                tableBody.Append("<input type='checkbox' /> Dissatisfaction with salary package<br/>");
            }
            else
            {
                tableBody.Append("<input type='checkbox' checked /> Dissatisfaction with salary package<br/>");
            }

            if (employees.FamilyNeed == 0)
            {
                tableBody.Append("<input type='checkbox' /> Pregnancy/home/family need<br/>");
            }
            else
            {
                tableBody.Append("<input type='checkbox' checked /> Pregnancy/home/family need<br/>");
            }

            if (employees.TypeOfWork == 0)
            {
                tableBody.Append("<input type='checkbox' /> Dissatisfaction with type of work<br/>");
            }
            else
            {
                tableBody.Append("<input type='checkbox' checked /> Dissatisfaction with type of work<br/>");
            }

            if (employees.CareerPath == 0)
            {
                tableBody.Append("<input type='checkbox' /> Dissatisfaction with career path<br/>");
            }
            else
            {
                tableBody.Append("<input type='checkbox' checked /> Dissatisfaction with career path<br/>");
            }

            if (employees.Disability == 0)
            {
                tableBody.Append("<input type='checkbox' /> Poor health/physical/disability<br/>");
            }
            else
            {
                tableBody.Append("<input type='checkbox' checked /> Poor health/physical/disability<br/>");
            }

            if (employees.Supervisor == 0)
            {
                tableBody.Append("<input type='checkbox' /> Dissatisfaction with supervisor<br/>");
            }
            else
            {
                tableBody.Append("<input type='checkbox' checked /> Dissatisfaction with supervisor<br/>");
            }

            tableBody.Append(@"
        </p>
    </div>

    <div>
        <p style='margin-top: 10px;'>");

            if (employees.Relocation == 0)
            {
                tableBody.Append("<input type='checkbox' /> Relocation to another city<br/>");
            }
            else
            {
                tableBody.Append("<input type='checkbox' checked /> Relocation to another city<br/>");
            }

            if (employees.Colleagues == 0)
            {
                tableBody.Append("<input type='checkbox' /> Dissatisfaction with co-workers<br/>");
            }
            else
            {
                tableBody.Append("<input type='checkbox' checked /> Dissatisfaction with co-workers<br/>");
            }

            if (employees.Travel == 0)
            {
                tableBody.Append("<input type='checkbox' /> Travel difficulties<br/>");
            }
            else
            {
                tableBody.Append("<input type='checkbox' checked /> Travel difficulties<br/>");
            }

            if (employees.WorkingConditions == 0)
            {
                tableBody.Append("<input type='checkbox' /> Dissatisfactory working conditions<br/>");
            }
            else
            {
                tableBody.Append("<input type='checkbox' checked /> Dissatisfactory working conditions<br/>");
            }

            if (employees.Education == 0)
            {
                tableBody.Append("<input type='checkbox' /> To attend further education<br/>");
            }
            else
            {
                tableBody.Append("<input type='checkbox' checked /> To attend further education<br/>");
            }

            if (employees.Benefits == 0)
            {
                tableBody.Append("<input type='checkbox' /> Dissatisfaction with benefits package<br/>");
            }
            else
            {
                tableBody.Append("<input type='checkbox' checked /> Dissatisfaction with benefits package<br/>");
            }

            tableBody.Append($"<p style='font-weight: bold; text-align: center;'> Others (please specify):{employees.OtherReason} </p><br/> <br/>");

            tableBody.Append(@"</p></div></div>");

            tableBody.Append("<label for='monthsServed'>2. How long have you served Umoja micro finance (write in months)</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"<label for='monthsServed'>Ans: {monthsServed}</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<label for='sharedDesire'>3. Did you share your desire to leave the company/concerns with immediate supervisor prior to leaving?</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"<label for='monthsServed'>Ans: {employees.InformSupervisor}</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<label for='constructiveFeedback'>4. Did you receive constructive feedback to help improve your situation?</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"<label for='monthsServed'>Ans: {employees.Feedback}</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<label for='resources'>5. How easy was it to get the resources (office equipment, transport, security, cell phone, etc.) you needed to do your job well?</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"<label for='monthsServed'>Ans: {employees.Resources}</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<label for='professionalGrowth'>6. How helpful was your position here in stimulating your professional growth?</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"<label for='monthsServed'>Ans: {employees.Growth}</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<label for='pay'>7. How well were you paid here for the work you did?</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"<label for='monthsServed'>Ans: {employees.Payment}</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<label for='recognition'>8. How often did you feel your contributions were recognized?</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"<label for='monthsServed'>Ans:{employees.Recognized}</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<label for='decisions'>9. How reasonable were decisions (e.g., work load distribution, leave acceptance, recommend for promotion, etc.) made by your supervisor?</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"<label for='monthsServed'>Ans: {employees.Decisions}</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<label for='voicingOpinion'>10. How comfortable did you feel voicing your opinion? (e.g., opinion on change of process, product, new ideas, etc.)</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"<label for='monthsServed'>Ans:{employees.Voicing}</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<label for='supervisorTreatment'>11. How well did your supervisor treat you? (e.g., common behavior, praising good work, health discussion, handling mistakes professionally, etc.)</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"<label for='monthsServed'>Ans: {employees.Treat}</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<label for='coWorkers'>12. How much did you like your co-workers?</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"<label for='monthsServed'>Ans: {employees.coworkers}</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<label for='teamwork'>13. How did the members of your team work together?</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"<label for='monthsServed'>Ans:{employees.teamMembers}</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<label for='stress'>14. In a typical week, how often did you feel stressed at work?</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"<label for='monthsServed'>Ans: {employees.stressed}</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<label for='workLifeBalance'>15. How difficult was it for you to balance your work and personal life while working here?</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"<label for='monthsServed'>Ans: {employees.WorkBalance}</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<label for='workPlaceSafety'>16. How safe did you feel here at your work place?</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"<label for='monthsServed'>Ans: {employees.SafePlace}</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<label for='workEnvironment'>17. Overall, how was your work environment?</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"<label for='monthsServed'>Ans: {employees.Environment}</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<label for='recommendation'>18. If you had a friend looking for a job, would you recommend us?</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"<label for='monthsServed'>Ans: {employees.RecommendUs}</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<label for='comments'>19. Any other comments or concerns, please feel free to write here.</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"<label for='monthsServed'>Ans: {employees.Comments}</label>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("</form>");

            tableBody.Append("<h4>We express our sincere gratitude for your invaluable participation and time.</h4>");

            var htmlContent = tableBody.ToString();


            var htmlToPdf = new HtmlToPdfConverter();

            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px;font - family: Helvetica; font - size:10px;'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);


            return File(pdfBytes, "application/pdf", "employees.pdf");
        }
        catch (Exception e)
        {

            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("Sacco")]
    public async Task<IActionResult> Sacco()
    {
        try
        {
            var list = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmployeeGetAllSacco");

            var tableBody = new StringBuilder();



            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Joining Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Contact Number</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Status</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Opening </th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Transaction</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Closing </th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            double totalOpeningBalance = 0;
            double totalTransactionBalance = 0;
            double TotolClosingBalance = 0;

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");

                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BranchName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");

                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DesignationName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.JoiningDate:dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.ContactNumber}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{(item.IsActive == true ? "Active" : "Resigned")}</td>");

                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.OpeningBalance}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.TransactionBalance}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.ClosingBalance}</td>");


                tableBody.Append("</tr>");

                totalOpeningBalance += item.OpeningBalance;
                TotolClosingBalance += item.ClosingBalance;
                totalTransactionBalance += item.TransactionBalance;

            }

            tableBody.Append("<tr>");
            tableBody.Append($"<td colspan='8' style='border: 1px solid #000000; text-align: right; padding: 8px;'></td>");
            tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{totalOpeningBalance:N0}</td>");
            tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{totalTransactionBalance:N0}</td>");
            tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{TotolClosingBalance:N0}</td>");
            tableBody.Append("</tr>");


            var pdfBytes = TableGeneration.TableTemplate(8, "Sacco List", tableBody);

            return File(pdfBytes, "application/pdf", "Sacco.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
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

            var datas = await _unitOfWork.SP_Call.List<EmpSalaryAttendance>("HrMonthlySalaryAttendance", parameter);

            var tableBody = new StringBuilder();

            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Payroll Id</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Salary Month Year</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Joining Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gender</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var data in datas)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");

                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.EmpPayrollId}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.SalaryMonthYear}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.DesignationName}</td>");
                //tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.JoiningDate)}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.Gender}</td>");


                tableBody.Append("</tr>");

            }


            var pdfBytes = TableGeneration.TableTemplate(8, "Salary Attendance List", tableBody);

            return File(pdfBytes, "application/pdf", "salaryattendance.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("Tenure")]
    public async Task<IActionResult> Tenure()
    {
        try
        {

            var list = await _unitOfWork.SP_Call.List<EmployeeGetAll>("hrEmployeeGetAllTenure");

            var tableBody = new StringBuilder();

            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Date Of Birth</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gender</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Email</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Contact Number</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Tenure Year</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>Tenure Month</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BranchName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DesignationName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DateOfBirth:dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Gender}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Email}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.ContactNumber.Replace("M:", "").Trim()}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.TenureYear}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.TenureMonth}</td>");
                tableBody.Append("</tr>");

            }

            var pdfBytes = TableGeneration.TableTemplate(11, "Tenure List", tableBody);

            return File(pdfBytes, "application/pdf", "TenureList.pdf");
        }
        catch (Exception e)
        {

            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
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

            var data = await _unitOfWork.SP_Call.OneRecord<EmpTimeSummeryView>("hrEmpTimeLogCardGetBySearch", parameter);
            var task = await _unitOfWork.SP_Call.List<EmpTimeSummeryView>("hrEmpTimeLogCardGetBySearch", parameter);
            //var task = await _unitOfWork.SP_Call.List<EmpTimeLog>("hrEmpTimeLogCardGetByPdf", parameter);
            var tableBody = new StringBuilder();

            tableBody.Append("<!DOCTYPE html>");
            tableBody.Append("<html lang='en'>");

            tableBody.Append("<head>");
            tableBody.Append("<meta charset='UTF-8'>");
            tableBody.Append("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
            tableBody.Append("<title>Time Card</title>");
            tableBody.Append("</head>");

            tableBody.Append("<body>");
            tableBody.Append("<table style='width: 100%; padding: 4px; font-family: Helvetica; font-size:10px;'>");
            tableBody.Append("<tr>");
            tableBody.Append("<td>");
            tableBody.Append("<img style='background-color: white; padding: 3px;' src='" + SD.ReportImageUrl + "'/>");
            tableBody.Append("</td>");
            tableBody.Append("</tr>");
            tableBody.Append("<tr>");
            tableBody.Append("<td style='text-align: center; font-weight: bold; font-size: 30px;'>Time Card</td>");
            tableBody.Append("</tr>");

            tableBody.Append("<tr>");
            tableBody.Append("<td>");
            tableBody.Append("<table style='padding: 5px; width: 100%; margin-left: 0;'>");
            tableBody.Append("<tr>");
            tableBody.Append("<td>");

            tableBody.Append("</td>");
            tableBody.Append("<td>");
            tableBody.Append($"<div>Employee PIN: {data.EmployeePin}</div>");
            tableBody.Append($"<div>Employee Name: {data.EmployeeName}</div>");
            tableBody.Append($"<div>Designation: {data.DesignationName}</div>");
            tableBody.Append("</td>");
            tableBody.Append("</tr>");
            tableBody.Append("</table>");
            tableBody.Append("</td>");
            tableBody.Append("</tr>");

            tableBody.Append("<table style='padding: 5px; width: 100%; margin-left: 0; border-collapse: collapse; border: 1px solid #000;'>"); // Added border here
            tableBody.Append("<tr>");
            tableBody.Append("<td style='font-weight: bold; border: 1px solid #000000;text-align: center;'>Task Date</td>");
            tableBody.Append("<td style='font-weight: bold; border: 1px solid #000000; text-align: center;'>Task Name</td>");
            tableBody.Append("<td style='font-weight: bold; border: 1px solid #000000; text-align: center;'>Task Hour</td>");
            tableBody.Append("</tr>");

            foreach (var item in task)
            {
                tableBody.Append("<tr>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: center;'>{item.TaskDate.ToString("dd-MMM-yyyy")}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: center;'>{item.TaskName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: center;'>{item.TaskHour}</td>");
                tableBody.Append("</tr>");
            }

            tableBody.Append("</table>");
            tableBody.Append("</table>");
            tableBody.Append("</body>");
            tableBody.Append("</html>");

            string htmlContent = tableBody.ToString();

            var htmlToPdf = new HtmlToPdfConverter();

            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "timecard.pdf");

        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
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

            var list = await _unitOfWork.SP_Call.List<EmpTimeSummeryView>("hrEmpTimeLogSummeryGetAll", parameter);

            var tableBody = new StringBuilder();

            tableBody.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;'>Employee PIN</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;'>Designation Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;'>Total Task Hour </th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");


                tableBody.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.DesignationName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.TaskHour}</td>");

                tableBody.Append("</tr>");

            }


            tableBody.Append("</tr>");

            tableBody.Append("</table>");


            var pdfBytes = TableGeneration.TableTemplate(4, "Active Employee List", tableBody);


            return File(pdfBytes, "application/pdf", "timelogSummery.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("TrainingList/{query}")]
    public async Task<IActionResult> TrainingList(string query)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@query", query);

            var list = await _unitOfWork.SP_Call.List<TrainingEvaluationView>("HrTraningEvaluationGetAll", parameter);

            var tableBody = new StringBuilder();
            tableBody.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;'>Category Name, TainingName, EmployeePin, Designation</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;'>Satisfied With Overall Training Session</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;'>Relevant Training Content</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;'>Effective Trainer In Delivering The Content</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;'>Training Materials Provided</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;'>Training Session</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;'>Likely to Apply Learned in Job</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;'>What Did You Like Most About The Training Session</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;'>What Could Be Improved in Future Training Sessions</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;'> Comments or Suggestions</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;'>Training Content</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;'>Trainer's Knowledge</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;'>Training Environment</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: center; padding: 8px;'>Overall Experience</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.CategoryName}, {item.TrainingName}, {item.EmployeePin}, {item.EmployeeName}, {item.DesignationName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.SatisfiedWithOverAllTrainingSession}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.RelevantTrainingContentToYourJob}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.EffectiveTrainerInDeliveringTheContent}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.UsefulTrainingMaterialsProvided}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: center; padding: 8px;'>{item.EngagingTrainingSession}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.LikelyApplyLearnedJob}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.DidYouLikeMostAboutTheTrainingSession}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.CouldImprovedFutureTrainingSessions}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.AnyAdditionalCommentsOrSuggestions}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.TrainingContent}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.TrainersKnowledge}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.TrainingEnvironment}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.OverallExperience}</td>");
                tableBody.Append("</tr>");

            }

            var pdfBytes = TableGeneration.TableTemplate(14, "Training Evaluation List", tableBody, size: "Large");

            return File(pdfBytes, "application/pdf", "TrainingEvaluationList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
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

            var list = await _unitOfWork.SP_Call.List<EmpTransferView>("hrEmpTransferGetAll", parameter);

            var tableBody = new StringBuilder();

            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Old Branch</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Old Department</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Effective Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>New Branch</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>New Department</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Particulars</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.DesignationName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.PreBranchName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.PreDepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EffectiveDate:dd/MM/yyyy}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.BranchName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{item.DepartmentName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Particulars}</td>");
                tableBody.Append("</tr>");

            }

            var pdfBytes = TableGeneration.TableTemplate(9, "Transfer List", tableBody);

            return File(pdfBytes, "application/pdf", "TransferList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

}