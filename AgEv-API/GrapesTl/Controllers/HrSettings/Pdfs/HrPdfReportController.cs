namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,HR Manager,HR Executive,Accounts Manager,Accounts Executive,Country Team Lead,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations,FMPU Manager")]
[Route("api/[controller]")]
[ApiController]
public class HrPdfReportController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    [AllowAnonymous]
    [HttpGet("JoiningLetter/{employeeid}")]
    public async Task<IActionResult> JoiningLetter(string employeeid)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EmployeeId", employeeid);
            var model = await _unitOfWork.SP_Call.OneRecord<EmployeeGetAll>("HrEmpLettersGetById", parameter);
            var salaryInWords = HelperUtils.NumberToWords((int)model.GrossSalary);
            var formattedDate = DateTime.Parse(model.JoiningDate.ToString()).ToString("dd/MMM/yyyy");

            var tableBody = new StringBuilder();
            tableBody.Append("<div style='font-family: Helvetica; font-size:10px;'>");
            var path = Path.Combine(Directory.GetCurrentDirectory(), "./wwwroot/pdfImages/logo.jpg");
            tableBody.Append("<div style='text-align: right;'><img src='" + path + "' alt='Logo' width='200' height='100'></div>");

            tableBody.Append("<br/><br/>");
            tableBody.Append("<div style='text-align: Left; font-size: 30px;'>Appointment Letter</div>");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"{formattedDate}");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"PIN : {model.EmployeePin}");
            tableBody.Append("<br/>");
            tableBody.Append($"<b>Mr. {model.EmployeeName}</b>");
            tableBody.Append("<br/>");
            tableBody.Append($"{model.Email}");
            tableBody.Append("<br/><br/>");
            tableBody.Append($"Dear {model.EmployeeName},");
            tableBody.Append("<br/><br/>");

            tableBody.Append($"<b>RE: APPOINTMENT TO THE POST OF {model.DesignationName.ToUpper()}</b>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("Reference is made to the offer letter with Umoja.");
            tableBody.Append("<br/><br/>");

            tableBody.Append("We have the pleasure of offering you an employment opportunity with Umoja Microfinance (Uganda) Limited (hereinafter referred to as &quot;the company&quot) as a Loan Officer.");
            tableBody.Append("<br/><br/>");

            tableBody.Append("Your appointment will be subject to the following terms and conditions of service:");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<b>1. DURATION OF CONTRACT</b>");
            tableBody.Append("<br/>");
            tableBody.Append($"Your employment with the company under this Contract will be for a period of 18 (eighteen) months subject to renewal depending on your performance and behavior, and will commence on {formattedDate}. It shall be subject to the satisfactory completion of a probationary period as indicated in clause 4 below.");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<b>2.  OFFICE-HOURS</b>");
            tableBody.Append("<br/>");
            tableBody.Append("The official working hours from Monday to Friday will be 8:00A.M. &ndash; 5:00P.M, with the exception of public holidays. You will be entitled to an hour for lunch per day. You may also be required to work beyond the official working hours, due to the nature of your job, and as the situation at the Company requires. Your Duty Station shall be Bugiri Branch. However, the Company may transfer you to other locations from time to time as per the organization requirements.");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<b>3. REMUNERATION</b>");
            tableBody.Append("<br/>");
            tableBody.Append($"Your Monthly Gross Consolidated Salary will be {SD.Currency} {model.GrossSalary}/= In words ({salaryInWords}). Your gross salary shall be payable into your bank account and it would be subject to Pay As You Earn (PAYE), National Social Security Fund(NSSF), Local service Tax (LST) deductions and any other statutory deductions which the company is or may be required to deduct at source in accordance with any relevant statutory regulatory laws of Uganda. Salaries shall be reviewed every 18 (eighteen) months by the company. Salary increments, if any shall however, will always be at the discretion of management and the company, and will also be based on performance of the company, performance of the employee and the prevailing market conditions.");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<b>4.  PROBATIONARY PERIOD</b>");
            tableBody.Append("<br/>");
            tableBody.Append("Your employment term shall commence with an initial probationary period of six (6) months running from the effective date stated above. There will be a review after three (3) months. Your confirmation in the role/position will depend on the receipt of satisfactory performance report from your Supervisor/Line Manager. The successful completion of your probation will be communicated to you in writing.");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<b>5. TRAVEL FACILITATION</b>");
            tableBody.Append("<br/>");
            tableBody.Append("The facilitation for travel will be provided as per the company policy.");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<b>6. ANNUAL LEAVE</b>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("During the course of your employment with us you will be entitled to twenty -one (21) days as per the Employment Act of Uganda 2006.");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<b>7. SICK LEAVE</b>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("During the course of your employment with us you will be entitled to sick leave as per the Human Resource Manual and in accordance with the Employment Act of Uganda, 2006.");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");


            path = Path.Combine(Directory.GetCurrentDirectory(), "./wwwroot/pdfImages/logo.jpg");
            tableBody.Append("<div style='text-align: right;'><img src='" + path + "' alt='Logo' width='200' height='100'></div>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<b>8. INVESTMENT CLUB</b>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("Upon joining Umoja Microfinance Uganda limited you will automatically become a member of the Umoja Microfinance investment club where you will be able to save a certain percentage of your salary and have access to other services as per the investment club by-laws and constitution.");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<b>9. TERMINATION</b>");
            tableBody.Append("<br/>");
            tableBody.Append("Termination of contract will occur in the event of occurrence of either of the following: by issuance of notice of termination in accordance with this agreement, expiry of the contract term, retirement, summary dismissal, protracted illness, permanent disability or death, as the case may be. Either party to this contract may during its term, terminate this contract by giving written notice of its or his/her intention to terminate employment or payment equivalent to the required notice period thereof as per the Employment Act Uganda 2006. In the unlikely event of gross misconduct on your part, the company reserves the right to terminate your contract summarily.");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<b>10. FURTHER TERMS AND CONDITIONS OF YOUR EMPLOYMEN</b>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("Any terms and conditions not specifically addressed in this contract or dealt with in terms of the company rules ,policies or procedures are governed by the Employment Act of Uganda, 2006, regulations thereunder and other applicable laws.\r\nYou are requested to return the enclosed copy duly signed as a token of your acceptance of the terms and conditions of your employment.");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<b>11. ACCEPTANCE</b>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("This contract is submitted to you in duplicate. If the terms are acceptable to you, we expect you to kindly endorse your acceptance, on both copies. We would like to congratulate you on this appointment and look forward to working with you.");
            tableBody.Append("<br/><br/>");
            tableBody.Append("Yours sincerely,");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<table><tr>");

            var localPathSigne = Path.Combine(Directory.GetCurrentDirectory(), "./wwwroot/pdfImages/signe.jpg");
            var localPathUmoja = Path.Combine(Directory.GetCurrentDirectory(), "./wwwroot/pdfImages/Uganda.jpg");
            tableBody.Append("<td align='left'><img src='file:///" + localPathSigne.Replace('\\', '/') + "' alt='UMOJA' width='150' height='150'></td>");
            // tableBody.Append("<td style='text-align: center;'><img src='file:///" + localPathUmoja.Replace('\\', '/') + "' alt='Another Image' width='200' height='200'></td>");
            tableBody.Append("<td style='text-align: center;'><img src='file:///" + localPathUmoja.Replace('\\', '/') + "' alt='Another Image' width='150' height='150' style='display: inline-block; vertical-align: top; margin-left: 150px;'>");

            tableBody.Append("</tr></table>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("Komugisha Grace");
            tableBody.Append("<br/>Human Resource Manager");
            tableBody.Append("<br/>Umoja Microfinance (SMC) Limited");
            tableBody.Append("<br/>Phone: +256-0782956438 / 0758200281");
            tableBody.Append("<br/><br/>");
            tableBody.Append("C.C  Accounts Dept.");
            tableBody.Append("<br/>C.C CEO");
            tableBody.Append("<br/><br/>");

            tableBody.Append("I ..................... accept the appointment of Umoja Fanisi Limited as Loan Officer on the terms and conditions of service set out above.");
            tableBody.Append("<br/><br/>");
            tableBody.Append("Signature: ............ Date: ........................................................................");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<br/><br/>");


            path = Path.Combine(Directory.GetCurrentDirectory(), "./wwwroot/pdfImages/logo.jpg");
            tableBody.Append("<div style='text-align: right;'><img src='" + path + "' alt='Logo' width='200' height='100'></div>");
            tableBody.Append("<br/><br/>");

            path = Path.Combine(Directory.GetCurrentDirectory(), "./wwwroot/pdfImages/Jobdescription.jpg");
            // Table to center the image on the PDF page
            tableBody.Append("<table style='width: 100%; height: 100vh;'>");
            tableBody.Append("<tr>");
            tableBody.Append("<td style='text-align: center; vertical-align: middle;'>");
            tableBody.Append("<img src='file:///" + path.Replace('\\', '/') + "' alt='Logo' width='600' height='200'>");
            tableBody.Append("</td>");
            tableBody.Append("</tr>");
            tableBody.Append("</table>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<table border='1' style='border-collapse: collapse; width: 50%;'>");
            tableBody.Append("<tr><td style='padding: 10px;'><b>Job title:</b></td><td style='padding: 10px;'>" + model.DesignationName + "</td></tr>");
            tableBody.Append("<tr><td style='padding: 10px;'><b>Work Location:</b></td><td style='padding: 10px;'>" + model.BranchName + "</td></tr>");
            tableBody.Append("<tr><td style='padding: 10px;'><b>Department:</b></td><td style='padding: 10px;'>Operations</td></tr>");
            tableBody.Append("<tr><td style='padding: 10px;'><b>Reports to:</b></td><td style='padding: 10px;'>Manager</td></tr>");
            tableBody.Append("</table>");

            tableBody.Append("<br/><br/>");
            tableBody.Append("Umoja Microfinance exists to serve and empower people to build brighter futures together. Umoja means &quot;unity&quot; in Swahili. We are in this together, and together, we can learn, grow, and transform lives. We serve our shareholders, our board, our team, and most importantly, our clients. We believe in service one step beyond.");
            tableBody.Append("<br/><br/>");
            tableBody.Append("We will transform the Microfinance industry by pursulng excellence in all we do. Transformation isn&rsquo;t easy; but we are committed to excellence by going to a client&rsquo;s home when they need extra help, creating new products with the latest software to meet our clients&rsquo; needs, and building an ambitious culture of consistency and positivity.");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<b>Overall Job purpose</b>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("In your role as Loan Officer, you are an integral part of our core Operations Team at Umoja Microfinance. As a loan officer you will evaluate and process credit and loan applications. Research applicants' financial status ,references, credit history and evaluate their ability to repay the loan.");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<b>Key Performance Indicators</b>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("Period: First Three (3) Months");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<li> First Month has a marketing target of Twenty (20) admissions</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> Second Month has a target of fifty (50) borrowers</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> Third Month has a target of fifty (50) borrowers</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li>Group formation by loan officer</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> Maintain discipline in groups 100%</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> Verification before admission 100%</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> Assessment of client&rsquo;s property 100%</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> Daily time management in office and the field, 8am reporting time</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> Behavior pattern i.e. team player, integrity, good communication</li>");
            tableBody.Append("<br/><br/>");



            path = Path.Combine(Directory.GetCurrentDirectory(), "./wwwroot/pdfImages/logo.jpg");
            tableBody.Append("<div style='text-align: right;'><img src='" + path + "' alt='Logo' width='200' height='100'></div>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<b>Day to Day Duties and Responsibilities</b>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<li> To market Umoja Microfinance products by clearly explaining to individuals the types of loans and credit options available as well as the terms of loans</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> To analyze and assess the applicant&rsquo;s credibility to determine feasibility of granting loans.</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> To carry out proper verification of both the individual&rsquo;s business premises as well as residence prior to recommendation for a loan</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> To evaluate loan applications and documents to confirm authenticity.</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> To approve loans and present to the respective Branch Manager for final Approval.</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> To update clients about any new policy that may be passed by the Company and ensure implementation of the same.</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> To ensure that the disbursed loans are recovered back within the stipulated period.</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> To review and update accurate information required concerning the loans.</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> To obtain and record accurate information about the clients.</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> Update in time all the necessary record books.</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> Any other duty that may be assigned to you.</li>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<b>Our Values</b>");
            tableBody.Append("<br/><br/>"); ;
            tableBody.Append("In addition to your day&ndash;to&ndash;day responsibilities, as a team member of Umoja Microfinance Ltd., we take pride in acting as Brand Ambassadors for our company in all that we do. We strive to make this a great place to work and an organization that our communities are proud of. To ensure that we do this our core company values should be at the center of all that we do:");
            tableBody.Append("<br/>");
            tableBody.Append("<li> <b>Be Consistent</b> &ndash; Do the simple tasks right every day, every time</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> <b>Be Ambitious</b> &ndash; Strive to innovate, grow, and improve in all you do</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> <b>Be Positive</b> &ndash; Stay Upbeat and keep a fun attitude</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> <b>Have Integrity</b> &ndash; The quality of being honest and having strong moral principles.</li>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("<b>Skills</b>");
            tableBody.Append("<br/><br/>");
            tableBody.Append("<li> Familiarity with computers and software applications</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> Solid understanding of direct/indirect lending products and practices</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> Excellent communication and interpersonal skills</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> Customer satisfaction orientation and sales competencies</li>");
            tableBody.Append("<br/>");
            tableBody.Append("<li> Ability to work in a goal oriented environment</li>");
            tableBody.Append("<br/><br/>");

            tableBody.Append("I hereby agree to abide and adhere to this Job Description at all times and I have also understood the key performance indicators (KPI's) for the period of three (3) months. I also confirm that I have read and understood it and that I have received all the relevant training to be able to complete all tasks required.");
            tableBody.Append("<br/><br/>");
            tableBody.Append("Signed: ............................................. Date: ............................................. Employee");
            tableBody.Append("<br/><br/>");

            tableBody.Append("</div>");

            var htmlContent = tableBody.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.CustomWkHtmlArgs = "--enable-local-file-access";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px;font - family: Helvetica; font - size:10px;'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "Loan Officer Contract.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("Payslip/{empPayrollId}")]
    public async Task<IActionResult> Payslip([FromRoute] string empPayrollId)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@EmpPayrollId", empPayrollId);

            var data = await _unitOfWork.SP_Call.OneRecord<EmpPayslip>("hrEmpPayrollGetByPdf", parameter);

            string htmlContent = TableGeneration.PayslipTemplate(data);

            var htmlToPdf = new HtmlToPdfConverter
            {
                PageHeaderHtml = "<div style='padding-top: 30px'></div>",
                PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px;font - family: Helvetica; font - size:10px;'>Page: <span class='page'></span></div>",
                Size = PageSize.A4,
                Orientation = PageOrientation.Portrait
            };
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "payslip.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
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

            var list = await _unitOfWork.SP_Call.List<EmpPayslip>("hrEmpPayrollGetAllNssf", parameter);

            var tableBody = new StringBuilder();

            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>NSSF Number</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gross Salary</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>NSSF Employee</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>NSSF Employer</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Total Deposit</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.NssfNumber}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.ProratedGrossSalary}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.NssfEmployee}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.NssfEmployer}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.TotalNssf}</td>");
                tableBody.Append("</tr>");
            }

            var pdfBytes = TableGeneration.TableTemplate(7, "NSSF Sheet", tableBody);


            return File(pdfBytes, "application/pdf", "nssf.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }
    [HttpGet("SalaryStop")]
    public async Task<IActionResult> SalaryStop()
    {
        try
        {
            var list = await _unitOfWork.SP_Call.List<EmpPayslip>("hrEmpPayrollGetAllSalaryStop");

            var tableBody = new StringBuilder();
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Joining Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Year</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Net Payment</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Stop Reason</th>");

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
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.JoiningDate}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.SalaryMonth}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.NetPayment}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.StopParticulars}</td>");
                tableBody.Append("</tr>");

            }

            var pdfBytes = TableGeneration.TableTemplate(9, "Stop Salary", tableBody);

            return File(pdfBytes, "application/pdf", "Stop Salary.pdf");

        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("StopSalaryPaid")]
    public async Task<IActionResult> StopSalaryPaid()
    {
        try
        {
            var list = await _unitOfWork.SP_Call.List<EmpPayslip>("hrEmpStopSalaryPaid");

            var tableBody = new StringBuilder();

            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Department</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Joining Date</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Year</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Net Payment</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Stop Reason</th>");

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
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.JoiningDate}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.SalaryMonth}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.NetPayment}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.StopParticulars}</td>");
                tableBody.Append("</tr>");

            }

            var pdfBytes = TableGeneration.TableTemplate(9, "Stop Salary", tableBody);

            return File(pdfBytes, "application/pdf", "StopSalary.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
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

            var list = await _unitOfWork.SP_Call.List<EmpPayslip>("hrEmpPayrollGetAllTax", parameter);

            var tableBody = new StringBuilder();
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>TIN Number</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Gross Salary</th>");
            tableBody.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>TAX Paye</th>");

            // do not delete this block of code as it is required to generate the table
            tableBody.Append("</tr></thead><tbody>");
            // end

            foreach (var item in list)
            {
                tableBody.Append("<tr style='border: 1px solid #000000;'>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeeName}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.TinNumber}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.ProratedGrossSalary}</td>");
                tableBody.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.TaxPaye}</td>");
                tableBody.Append("</tr>");

            }

            var pdfBytes = TableGeneration.TableTemplate(5, "Tax Sheet", tableBody);

            return File(pdfBytes, "application/pdf", "Tax.pdf");

        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }
}


