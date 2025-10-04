using GrapesTl.Models.HrSettings;

namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,Audit Executive,Audit Manager,HR Manager,HR Executive")]
[Route("api/[controller]")]
[ApiController]
public class AdAppAuditLogController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    [HttpGet("AuditTrail/{fromDate}/{tillDate}")]
    public async Task<IActionResult> AuditTrail([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FromDate", fromDate);
            parameter.Add("@TillDate", tillDate);


            var data = await _unitOfWork.SP_Call.List<AppAuditLog>("AdAppAuditLogGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("LogAuditTrail/{fromDate}/{tillDate}")]
    public async Task<IActionResult> LogAuditTrail([FromRoute] DateTime fromDate, [FromRoute] DateTime tillDate)
    {

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@fromDate", fromDate);
            parameter.Add("@tillDate", tillDate);

            var data = await _unitOfWork.SP_Call.List<AppAuditLog>("AdAppAuditLogGetAll", parameter);


            var sb = new StringBuilder();
            sb.Append("<table style='width: 100%; border-collapse: collapse; font-family: Arial, Helvetica, sans-serif;'>");
            sb.Append("<thead style='display: table-header-group;'>");

            sb.Append("<tr>");
            sb.Append("<th colspan='6'>");
            sb.Append("<table style='width: 100%'>");

            sb.Append("<tbody>");

            sb.Append("<tr>");
            sb.Append("<td style='text-align: center;'>");
            sb.Append("<img  src='" + SD.ReportImageUrl + "'/>");
            sb.Append("</td >");
            sb.Append("</tr>");
            sb.Append("<tr>");
            sb.Append("<td style='text-align: center; font-size: 25px;padding-bottom: 10px; padding-top: 10px'>Audit Log Report</td>");

            sb.Append("</tr>");
            sb.Append("</tbody>");
            sb.Append("</table>");

            sb.Append("</th>");

            sb.Append("</tr>");

            sb.Append("<tr>");

            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Operation By</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Operation Type</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Operation Name</th>");
            sb.Append("<th style='border: 1px solid #000000; text-align: left; padding: 8px;'>Operation Date</th>");

            sb.Append("</tr>");

            sb.Append("</thead>");
            sb.Append("<tbody>");
            foreach (var item in data)
            {
                sb.Append("<tr style='border: 1px solid #000000;'>");
                //sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.EmployeePin}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.OperationByName}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.OperationType}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.Details}</td>");
                sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.OperationDate:dd/MM/yyyy}</td>");
                // sb.Append($"<td style='border: 1px solid #000000; text-align: left; padding: 8px;'>{item.UpdateDate:dd/MM/yyyy}</td>");

                sb.Append("</tr>");
            }
            sb.Append("</tbody>");
            sb.Append("</table>");

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
}
