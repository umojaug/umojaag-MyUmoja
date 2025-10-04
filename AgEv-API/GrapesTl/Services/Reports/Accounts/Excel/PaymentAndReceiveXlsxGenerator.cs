namespace GrapesTl.Service;
public class PaymentAndReceiveXlsxGenerator(IUnitOfWork unitOfWork) : IReportGenerator
{
    public string Key => "paymentAndReceiveXlsx";
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    private async Task<List<NoteCCYDto>> GetDataAsync(ReportParams model)
    {
        var parameter = new DynamicParameters();
        parameter.Add("@BranchIds", model.BranchIds);
        parameter.Add("@FromDate", model.FromDate);
        parameter.Add("@TillDate", model.TillDate);

        var data = (await _unitOfWork.SP_Call.List<NoteCCYDto>("AcFisPaymentAndReceive", parameter)).ToList();
        return data;
    }

    public async Task GenerateAsync(XLWorkbook workbook, ReportParams model)
    {
        var data = await GetDataAsync(model);

        var worksheet = workbook.Worksheets.Add("Receipt and Payment Report");
        worksheet.Cell("A2").Value = "Receipt and Payment Report";
        worksheet.Cell("A2").Style.Font.SetBold().Font.SetFontSize(14).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

        if (data.Count == 0)
        {
            worksheet.Cell("A3").Value = SD.Message_NotFound;
            worksheet.Columns().AdjustToContents();
            return;
        }

        worksheet.Cell("A1").Value = data.First().CompanyName;
        worksheet.Cell("A3").Value = $"Report Date: {DateTime.Now:yyyy-MM-dd HH:mm:ss}";
        worksheet.Cell("A4").Value = $"From Date: {model.FromDate:yyyy-MM-dd} - To Date: {model.TillDate:yyyy-MM-dd}";
        worksheet.Cell("A5").Value = $"Branch(es): {string.Join(", ", data.Select(d => d.BranchName).Distinct())}";

        var dt = new DataTable();
        dt.Columns.Add("Classification Name");
        dt.Columns.Add("Ledger Name");
        dt.Columns.Add("Dr", typeof(decimal));
        dt.Columns.Add("Cr", typeof(decimal));

        // Group and summarize
        var grouped = data
            .GroupBy(x => x.ClassificationName)
            .OrderBy(g => g.Key);

        foreach (var group in grouped)
        {
            // Add classification header row
            dt.Rows.Add(group.Key, "", null, null);

            foreach (var row in group)
            {
                dt.Rows.Add("", row.LedgerName, row.Dr, row.Cr);
            }

            // Add subtotal row
            dt.Rows.Add("", "Subtotal",
                group.Sum(x => x.Dr),
                group.Sum(x => x.Cr));
        }

        // Grand Total
        dt.Rows.Add("", "Grand Total",
            data.Sum(x => x.Dr),
            data.Sum(x => x.Cr));

        // Insert table into worksheet
        var range = worksheet.Cell("A7").InsertTable(dt);
        range.Theme = XLTableTheme.None;
        worksheet.Columns().AdjustToContents();

        // Style rows
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            var row = dt.Rows[i];
            string ledgerName = row["Ledger Name"]?.ToString() ?? "";

            if (ledgerName == "Subtotal" || ledgerName == "Grand Total")
            {
                worksheet.Row(i + 7).Style.Font.SetBold();
            }
        }

        // Number formatting
        worksheet.Column(3).Style.NumberFormat.Format = "#,##0.00"; // Dr
        worksheet.Column(4).Style.NumberFormat.Format = "#,##0.00"; // Cr
    }

}