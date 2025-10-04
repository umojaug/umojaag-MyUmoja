namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class CrmPdfController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;


    [HttpGet("List/{fromDate}/{tillDate}")]
    public async Task<IActionResult> ReportSearchPdf([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {


            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);


            var datas = await _unitOfWork.SP_Call.List<CrmMemberView>("crmMemberGetByDate", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='9'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>New Member</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Pin, Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>LO Contact Number, Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Member Id, Member Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Total Family Members, Contact Address</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>House Status, Contact Number</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Type of business, Monthly Income</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Others Income, Loan from others Mfi</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Expected Loan Amount, Potential for Loan</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Entry Date</th>");

            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}, {data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.LoContactNumber}, {data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.MemberId}, {data.MemberName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.TotalFamilyMembers}, {data.ContactAddress}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.HouseStatus}, {data.ContactNumber}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.TypeOfBusiness}, {data.MonthlyIncome}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.OthersIncome}, {data.LoanFromOtherMfi}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.ExpectedLoanAmount}, {data.PotentialForLoan}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EntryDate:dd/MM/yyyy}</td>");

                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "MemberList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }



    [HttpGet("Summary/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Summary([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);

            var datas = await _unitOfWork.SP_Call.List<CrmMemberSummary>("crmMemberGetByDate", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='4'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Member Summary</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>LO Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>EmployeePin</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>TotalMember</th>");
            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var data in datas)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{data.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: right; padding: 8px;'>{data.TotalMember}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "MemberSummary.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }







}
