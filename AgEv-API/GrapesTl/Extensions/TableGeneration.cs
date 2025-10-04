namespace GrapesTl.Extensions;

public static class TableGeneration
{
    public static byte[] TableTemplate(int numberOfColumn, string reportName, StringBuilder tableBody, StringBuilder extraHeader = null, string size = "A4", string dateRange = "")
    {
        var tc = new StringBuilder();

        tc.Append("<table style='width: 100%; border-collapse: collapse; font-family: Helvetica; font-size:10px;'>");
        tc.Append("<thead style='display: table-header-group;'>");
        tc.Append("<tr>");
        tc.Append($"<th colspan='{numberOfColumn}'>");
        tc.Append("<table style='width: 100%'>");
        tc.Append("<tbody>");
        tc.Append("<tr>");
        tc.Append($"<td style='text-align: left; padding-top: 10px'><img style='background-color:white; padding: 3px' src='{SD.ReportImageUrl}'/></td >");
        tc.Append($"<td style='text-align: right; font-size: 25px;padding-bottom: 10px; padding-top: 10px;'>{reportName}</td>");
        tc.Append("</tr>");
        if (string.IsNullOrWhiteSpace(dateRange) == false)
        {
            tc.Append("<tr>");
            tc.Append($"<td style='text-align: right; padding-bottom: 10px; padding-top: 10px;'>{dateRange}</td>");
            tc.Append("</tr>");
        }
        tc.Append("</tbody>");
        tc.Append("</table>");
        tc.Append("</th>");
        tc.Append("</tr>");
        tc.Append(extraHeader != null ? extraHeader : "");
        tc.Append("<tr>");
        tc.Append(tableBody);
        tc.Append("</tbody>");
        tc.Append("</table>");

        var htmlToPdf = new HtmlToPdfConverter
        {
            PageHeaderHtml = "<div style='padding-top: 30px'></div>",
            PageFooterHtml = "<div class='page-footer' style='text-align: center; padding-bottom: 10px;font - family: Helvetica; font - size:10px;'>Page: <span class='page'></span></div>",
            Size = size == "A4" ? PageSize.A4 : PageSize.Legal,
            Orientation = size == "A4" ? PageOrientation.Portrait : PageOrientation.Landscape
        };
        var pdfBytes = htmlToPdf.GeneratePdf(tc.ToString());

        return pdfBytes;
    }

    public static string PayslipTemplate(EmpPayslip empPaySlip)
    {
        var ps = new StringBuilder();

        ps.Append("<div style='font-family: Arial, sans-serif; width: 600px; margin: 0 auto;'>");
        ps.Append("<table border='0' width='100%' cellpadding='5' cellspacing='0'>");

        // Header section Start
        ps.Append("<tr>");
        ps.Append("<td colspan='2' style='text-align: left; padding: 10px;'>");
        ps.Append("<img style='background-color: white; padding: 3px; width:81px' src='" + SD.ReportImageUrl + "'/>");
        ps.Append("</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td colspan='2' style='text-align: center; font-size: 20px; font-weight: bold;'>");
        ps.Append("PaySlip");
        ps.Append("</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td colspan='2' style='text-align: center; font-size: 20px; font-weight: bold;'>");
        ps.Append($"{empPaySlip.CompanyName}");
        ps.Append("</td>");
        ps.Append("</tr>");
        // Header section End

        //employee details Start
        ps.Append("<tr>");
        ps.Append("<td colspan='2' style='padding: 10px 0;'>");
        ps.Append("<table border='0' width='100%' cellpadding='1' cellspacing='1'>");
        ps.Append($"<tr><td>PIN: {empPaySlip.EmployeePin}</td><td>Name: {empPaySlip.EmployeeName}</td></tr>");
        ps.Append($"<tr><td>Date of Joining: {empPaySlip.JoiningDate.ToString("dd/MMM/yyyy")}</td><td>Designation: {empPaySlip.DesignationName}</td></tr>");
        ps.Append($"<tr><td>Pay Period: {empPaySlip.SalaryMonth},{empPaySlip.SalaryYear}</td><td>NSSF Number: {empPaySlip.NssfNumber}</td></tr>");
        ps.Append($"<tr><td>No. of Days: {empPaySlip.TotalNoofDays} - Head Office</td><td>Bank Name: {empPaySlip.BankName}</td></tr>");
        ps.Append($"<tr><td>Branch: {empPaySlip.CompanyName}</td><td>Bank A/C No.: {empPaySlip.BankAccountNumber}</td></tr>");
        ps.Append($"<tr><td>Department: {empPaySlip.DepartmentName}</td><td>TIN: {empPaySlip.TinNumber}</td></tr>");
        ps.Append("</table>");
        ps.Append("</td>");
        ps.Append("</tr>");
        //end

        // Payments and Deductions Table
        ps.Append("<tr style='background-color: #f2f2f2'><th style='text-align: left'>Particulars</th><th style='text-align: right'>Amount</th></tr>");
        ps.Append("<tr>");
        ps.Append("<td>Gross Salary:</td>");
        ps.Append($"<td style='text-align: right'>{empPaySlip.GrossSalary:N2}</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td>Prorated Gross :</td>");
        ps.Append($"<td style='text-align: right'>{empPaySlip.ProratedGrossSalary:N2}</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td>LST:</td>");
        ps.Append($"<td style='text-align: right'>{empPaySlip.Lst:N2}</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td>NSSF (5%)</td>");
        ps.Append($"<td style='text-align: right'>{empPaySlip.NssfEmployee}</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td>Pgs LST:</td>");
        ps.Append($"<td style='text-align: right'>{empPaySlip.PgsLst:N2}</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td>TAX PAYE:</td>");
        ps.Append($"<td style='text-align: right'>{empPaySlip.TaxPaye:N2}</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td>Sacco Deduction:</td>");
        ps.Append($"<td style='text-align: right'>{empPaySlip.SaccoDeduction:N2}</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td>Total Deduction :</td>");
        ps.Append($"<td style='text-align: right'>{empPaySlip.TotalDeduction:N2}</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td>Sacco Payment:</td>");
        ps.Append($"<td style='text-align: right'>{empPaySlip.SaccoPayment:N2}</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td>Advance Deductions</td>");
        ps.Append($"<td style='text-align: right'>{empPaySlip.AdvanceDeductions:N2}</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td>Sacco Loan Re-Payment Deduction </td>");
        ps.Append($"<td style='text-align: right'>{empPaySlip.SaccoLoanRePaymentDeduction:N2}</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td>Net payment :</td>");
        ps.Append($"<td style='text-align: right'>{empPaySlip.NetPayment:N2}</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td>Loss Deduction:</td>");
        ps.Append($"<td style='text-align: right'>{empPaySlip.LostDeduction:N2}</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td>NSSF (10%):</td>");
        ps.Append($"<td style='text-align: right'>{empPaySlip.NssfEmployee:N2}</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td>NSSF  Payable:</td>");
        ps.Append($"<td style='text-align: right'>{empPaySlip.TotalNssf:N2}</td>");
        ps.Append("</tr>");

        ps.Append("<tr>");
        ps.Append("<td>Trainee Arrears:</td>");
        ps.Append($"<td style='text-align: right'>{empPaySlip.TraineeArrears:N2}</td>");
        ps.Append("</tr>");



        // Footer
        ps.Append("<tr>");
        ps.Append("<td colspan='2' style='text-align: center; padding: 10px; font-size: 10px;'>");
        ps.Append("This is a system generated Payslip");
        ps.Append("</td>");
        ps.Append("</tr>");

        ps.Append("</table>");
        ps.Append("</div>");

        return ps.ToString();
    }
}
