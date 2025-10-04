namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class OpsPdfController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;

    [HttpGet("MyReport/{fromDate}/{tillDate}")]
    public async Task<IActionResult> MyReport([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<AllVisitView>("OpsAllVisitMyReport", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='11'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>My Visit History</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Type</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Stay Overnight</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Manager</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Manager</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Submit Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Accept Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Reject Remarks</th>");
            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var datum in data)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.VisitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.VisitType}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.StayOvernight}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.BranchManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.ManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.SubmitRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.AcceptRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.RejectRemarks}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "VisitHistory.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("Report/{fromDate}/{tillDate}")]
    public async Task<IActionResult> Report([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<AllVisitView>("OpsAllVisitReport", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='11'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Visit History</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Type</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Stay Overnight</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Manager Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Submit Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Submit Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Accept Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Reject Remarks</th>");
            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var datum in data)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.VisitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.VisitType}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.StayOvernight}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.ManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.SubmitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.SubmitRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.AcceptRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.RejectRemarks}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "VisitHistory.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

    [HttpGet("MyVisitCount/{fromDate}/{tillDate}")]
    public async Task<IActionResult> MyVisitCount([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<AllVisitCount>("OpsAllVisitCountMyReport", parameter);

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
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>My Visit Count</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visitor Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>No. Of Visits</th>");

            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var datum in data)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.VisitCount}</td>");

                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "VisitHistory.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("VisitCount/{fromDate}/{tillDate}")]
    public async Task<IActionResult> VisitCount([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var datums = await _unitOfWork.SP_Call.List<AllVisitCount>("OpsAllVisitCountReport", parameter);

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
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>My Visit Count</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visitor Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: right; padding: 8px;'>No. Of Visits</th>");

            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var datum in datums)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");

                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.VisitCount}</td>");

                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "VisitHistory.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("TravelHistory/{fromDate}/{tillDate}")]
    public async Task<IActionResult> TravelHistory([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var datums = await _unitOfWork.SP_Call.List<TravelingBillView>("OpsAllTravelReport", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='6'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Travel History</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Travel Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Applicant</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Checked By</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Supervisor</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Short Description</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Status</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Bill Status</th>");

            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var datum in datums)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.TravelingDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.CheckerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.ManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.Remarks}</td>");
                if (datum.IsSubmit == 0)
                {
                    sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>Not submitted</td>");
                }
                else if (datum.IsSubmit == 1)
                {
                    sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>Pending</td>");
                }
                else if (datum.IsSubmit == 2)
                {
                    sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>Checked By Approved</td>");
                }
                else if (datum.IsSubmit == 3)
                {
                    sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>Approved</td>");
                }
                else if (datum.IsSubmit == 4)
                {
                    sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>Return</td>");
                }

                if (datum.BillStatus == 1)
                {
                    sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>Paid</td>");
                }
                else
                {
                    sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>Unpaid</td>");
                }


                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "VisitHistory.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("Listbyuser/{fromDate}/{tillDate}")]
    public async Task<IActionResult> ListbyuserSearchPdf([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var datums = await _unitOfWork.SP_Call.List<AllVisitView>("OpsAllVisitGetByUser", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='12'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Visit List</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Entry Time</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Exit Time</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Type</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Stay Overnight</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Manager Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Manager Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Submit Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Submit Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Accept Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Reject Remarks</th>");
            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var datum in datums)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.VisitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.EntryTime}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.ExitTime}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.VisitType}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.StayOvernight}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.BranchManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.ManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.SubmitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.SubmitRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.AcceptRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.RejectRemarks}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "VisitList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("ListByBranchManager")]
    public async Task<IActionResult> ListByBranchManagerSearchPdf()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();

            parameter.Add("@EmployeeId", user.EmployeeId);

            var datums = await _unitOfWork.SP_Call.List<AllVisitView>("OpsAllVisitGetByBM", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='12'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Application Received As BM</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Type</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Stay Overnight</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Manager Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Manager Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Submit Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Submit Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Accept Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Reject Remarks</th>");
            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var datum in datums)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.VisitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.VisitType}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.StayOvernight}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.BranchManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.ManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.SubmitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.SubmitRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.AcceptRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.RejectRemarks}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "VisitReceivedAsBmList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("ListByManager")]
    public async Task<IActionResult> ListByManagerSearchPdf()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();

            parameter.Add("@EmployeeId", user.EmployeeId);

            var datums = await _unitOfWork.SP_Call.List<AllVisitView>("OpsAllVisitGetByManager", parameter);

            var sb = new StringBuilder();




            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='12'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Application Received As Supervisor</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Employee Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Type</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Stay Overnight</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Manager Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Manager Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Submit Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Submit Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Accept Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Reject Remarks</th>");
            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var datum in datums)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.VisitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.VisitType}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.StayOvernight}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.BranchManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.ManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.SubmitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.SubmitRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.AcceptRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.RejectRemarks}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "VisitReceivedAsManagerList.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }


    [HttpGet("SupervisorReport/{fromDate}/{tillDate}")]
    public async Task<IActionResult> SupervisorReport([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);
            parameter.Add("@EmployeeId", user.EmployeeId);

            var data = await _unitOfWork.SP_Call.List<AllVisitView>("OpsAllVisitSupervisorReport", parameter);


            var sb = new StringBuilder();

            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='11'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; padding-top: 10px'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>Visit History As Supervisor</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");
            sb.Append("</tr>");

            sb.Append("<tr>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'> Visit Date</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Applicant</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Designation</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Visit Type</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Stay Overnight</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Branch Manager</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Supervisor</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Submit Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Accept Remarks</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Reject Remarks</th>");
            sb.Append("</tr>");
            sb.Append("</thead>");


            foreach (var datum in data)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.VisitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.BranchName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.EmployeeName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.DesignationName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.VisitType}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.StayOvernight}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.ManagerName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.SubmitDate:dd/MM/yyyy}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.SubmitRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.AcceptRemarks}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{datum.RejectRemarks}</td>");
                sb.Append("</tr>");

            }


            sb.Append("</tr>");

            sb.Append("</table>");


            var htmlContent = sb.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "VisitHistory.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating PDF file: " + e.Message);
        }
    }

}
