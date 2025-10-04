namespace GrapesTl.Controllers;

[Authorize(Roles = "Super Admin,HR Manager,HR Executive,Accounts Manager,Accounts Executive,Country Team Lead,Internal Audit Manager,Assistant Audit Manager,Internal Audit Officer,Internal Audit Officer – Fraud & Investigations,FMPU Manager")]
[Route("api/[controller]")]
[ApiController]
public class UserReportController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    [AllowAnonymous]
    [HttpGet("BoardMonthlyReport/{id}")]
    public async Task<IActionResult> BoardMonthlyReport(string id)
    {
        try
        {
            var summaryData = await _unitOfWork.SP_Call.List<BoardMonthMaster>("BoardMonthlyGetAll");
            var parameter = new DynamicParameters();
            parameter.Add("@ReportId", id);
            var detailsData = await _unitOfWork.SP_Call.List<BoardMonthView>("BoardMonthlyDetailsGetAll", parameter);
            var header = summaryData.FirstOrDefault(x => x.ReportId == id);

            var reportDate = header?.ReportDate.ToString("dd MMMM yyyy") ?? DateTime.Now.ToString("dd MMMM yyyy");
            var preparedBy = header?.PreparedBy ?? "Country Team Lead";

            var tc = new StringBuilder();

            tc.Append("<table style='width: 100%; border-collapse: collapse; font-family: Helvetica; font-size:14px;'>");
            tc.Append("<thead style='display: table-header-group;'>");
            tc.Append("<tr><th colspan='5'>");
            tc.Append("<table style='width: 100%;'><tbody>");
            tc.Append("<tr>");
            tc.Append($"<td style='text-align: left; padding-top: 10px'><img style='background-color:white; padding: 3px' src='{SD.ReportImageUrl}'/></td>");
            tc.Append("<td style='text-align: right; font-size: 25px; padding: 10px;'>Monthly Board Update</td>");
            tc.Append("</tr></tbody></table>");
            tc.Append("</th></tr></thead>");
            tc.Append("<tbody>");
            tc.Append($"<tr><td colspan='5'><b>Prepared by:</b> {preparedBy}</td></tr>");
            tc.Append($"<tr><td colspan='5'><b>Date:</b> {reportDate}</td></tr>");
            tc.Append("<tr><td colspan='5'><hr/></td></tr>");

            // Executive Summary (larger font)
            tc.Append($"<tr><td colspan='5' style='font-size:16px;'><h3>1. Executive Summary</h3>{header?.ExecutiveSummary}<br/>{header?.SignificantDevelopments}</td></tr>");

            // Operations Section
            tc.Append("<tr><td colspan='5'><h4>2. Operations</h4>Summary of branch performance</td></tr>");
            tc.Append("<tr><td colspan='5'><table border='1' style='width: 100%; border-collapse: collapse; text-align: center; font-size:14px;'><thead>");
            tc.Append("<tr><th>KPI</th><th>YTD Actual</th><th>YTD Budgeted</th><th>YTD Variance</th><th>YTD Variance %</th></tr>");
            tc.Append("</thead><tbody>");

            foreach (var item in detailsData.Where(x => x.DepartmentType == "Operations"))
            {
                tc.Append($"<tr><td>{item.MetricName}</td><td>{item.YTDActual}</td><td>{item.YTDBudgeted}</td><td>{item.YTDVariance}</td><td>{item.YTDVariancePercent.ToString("F2")}</td></tr>");
            }

            tc.Append("</tbody></table></td></tr>");
            tc.Append($"<tr><td colspan='5'>Major Operational Issues: </td></tr>");

            // Finance
            tc.Append("<tr><td colspan='5'><h4>3. Finance</h4></td></tr>");
            tc.Append("<tr><td colspan='5'><table border='1' style='width: 100%; border-collapse: collapse; text-align: center; font-size:14px;'><thead>");
            tc.Append("<tr><th>Financial</th><th>YTD Actual</th><th>YTD Budgeted</th><th>YTD Variance</th><th>YTD Variance %</th></tr>");
            tc.Append("</thead><tbody>");

            foreach (var item in detailsData.Where(x => x.DepartmentType == "Finance"))
            {
                tc.Append($"<tr><td>{item.MetricName}</td><td>{item.YTDActual}</td><td>{item.YTDBudgeted}</td><td>{item.YTDVariance}</td><td>{item.YTDVariancePercent.ToString("F2")}</td></tr>");
            }

            tc.Append("</tbody></table></td></tr>");

            // Human Resources
            tc.Append($"<tr><td colspan='5'><h2>4. Human Resources</h2>" +
                      $"Staffing highlights:<br/>" +
                      $"Total Headcount: {header.TotalHeadcount}<br/>" +
                      $"Turnover Rate for month and YTD: {header.TurnoverRateMonth}<br/>" +
                      $"New hires and vacancies (senior level only e.g., DTL/Head of Department level and above):<br/>" +
                      $"New Hires: {header.SeniorLevelNewHires}<br/>" +
                      $"Vacancies: {header.SeniorLevelVacancies}<br/>" +
                      $"Training or capacity-building updates: {header.TrainingUpdates}<br/>" +
                      $"Summary of any critical or high-risk Legal Case Updates: {header.LegalCaseUpdates}</td></tr>");

            // IT
            tc.Append($"<tr><td colspan='5'><h2>5. Information Technology</h2>" +
                      $"System performance: uptime, outages, key upgrades: {header.SystemPerformance}<br/>" +
                      $"Cybersecurity updates or issues (e.g., threats, incidents): {header.CybersecurityUpdates}<br/>" +
                      $"Any IT support gaps impacting operations: {header.ITSupportGaps}</td></tr>");

            // Internal Audit
            tc.Append($"<tr><td colspan='5'><h2>6. Internal Audit</h2>" +
                      $"Audit Plan Execution (Audits completed or ongoing this month): {header.AuditPlanExecution}<br/>" +
                      $"Identified Emerging risk for board's attention (including recommendation): {header.EmergingRisks}<br/>" +
                      $"Summary of Individual Fraud incidents reported above $500 if any: {header.FraudSummary}</td></tr>");

            // Key Risks or Issues
            tc.Append($"<tr><td colspan='5'><h2>7. Key Risks or Issues</h2>" +
                      $"Summary of top 2 to 3 risks across departments: {header.RiskSummary}<br/>" +
                      $"Mitigation steps underway: {header.MitigationSteps}</td></tr>");

            // Upcoming Priorities
            tc.Append($"<tr><td colspan='5'><h2>8. Upcoming Priorities</h2>" +
                      $"What's planned for the next month across functions: {header.UpcomingPlans}<br/>" +
                      $"Any board input or approval needed: {header.BoardInputNeeded}</td></tr>");

            tc.Append("</tbody></table>");

            var htmlContent = tc.ToString();

            var htmlToPdf = new HtmlToPdfConverter();
            htmlToPdf.PageHeaderHtml = "<div style='padding-top: 30px'></div>";
            htmlToPdf.CustomWkHtmlArgs = "--enable-local-file-access";
            htmlToPdf.PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px;font-family: Helvetica; font-size:10px;'>Page: <span class='page'></span></div>";
            var pdfBytes = htmlToPdf.GeneratePdf(htmlContent);

            return File(pdfBytes, "application/pdf", "Month.pdf");
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error generating PDF: " + e.Message);
        }
    }

}


