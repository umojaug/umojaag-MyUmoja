namespace GrapesTl.Service;
public class CashBookXlsxGenerator(IUnitOfWork unitOfWork) : IReportGenerator
{
    public string Key => "cashBookXlsx";
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    private async Task<List<CashBookDto>> GetDataAsync(ReportParams model)
    {
        var parameter = new DynamicParameters();
        parameter.Add("@BranchIds", model.BranchIds);
        parameter.Add("@FromDate", model.FromDate);
        parameter.Add("@TillDate", model.TillDate);

        var data = (await _unitOfWork.SP_Call.List<CashBookDto>("AcFisCashBookGetAll", parameter)).ToList();
        return data;
    }

    public async Task GenerateAsync(XLWorkbook workbook, ReportParams model)
    {
        var data = await GetDataAsync(model);

        var worksheet = workbook.Worksheets.Add("Cash Book Report");
        worksheet.Cell("A2").Value = "Cash Book Report";
        worksheet.Cell("A2").Style.Font.SetBold().Font.SetFontSize(14).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

        if (data.Count == 0)
        {
            worksheet.Cell("A3").Value = SD.Message_NotFound;
            worksheet.Columns().AdjustToContents();
            return;
        }

        var columnsToInclude = new Dictionary<string, string>
    {
        { "WorkDate", "Date" },
        { "AccountName", "Account Name" },
        { "VoucherNo", "Voucher Number" },
        { "OpeningBalance", "Opening Balance" },
        { "Dr",  $"Debit ({SD.Currency})" },
        { "Cr",  $"Credit ({SD.Currency})" },
        { "Balance","Balance"},
    };


        DataTable dataTable = data.ToDataTable(columnsToInclude.Keys.ToList());

        foreach (var pair in columnsToInclude)
        {
            if (dataTable.Columns.Contains(pair.Key))
                dataTable.Columns[pair.Key].ColumnName = pair.Value;
        }

        double totalDr = data.Sum(x => x.Dr);
        double totalCr = data.Sum(x => x.Cr);
        double totalDiff = totalDr - totalCr;


        // Add SL# manually in the DataTable after conversion
        var filteredData = data.Select((item, index) => new
        {
            SL = index + 1,
            item.WorkDate,
            item.AccountName,
            item.VoucherNo,
            item.Dr,
            item.Cr,
        }).ToList();

        // Include SL# in columns first
        var extendedColumns = new Dictionary<string, string> { { "SL", "SL#" } };
        foreach (var kv in columnsToInclude)
            extendedColumns.Add(kv.Key, kv.Value);



        // Header section
        worksheet.Cell("A1").Value = data.First().CompanyName;
        worksheet.Cell("A3").Value = $"Report Date: {DateTime.Now:yyyy-MM-dd HH:mm:ss}";
        worksheet.Cell("A4").Value = $"From Date: {model.FromDate:yyyy-MM-dd} - To Date: {model.TillDate:yyyy-MM-dd}";

        string lastColumn = ((char)('A' + dataTable.Columns.Count - 1)).ToString();
        worksheet.Range($"A1:{lastColumn}1").Merge().Style.Font.SetBold().Font.SetFontSize(16).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        worksheet.Range($"A2:{lastColumn}2").Merge().Style.Font.SetBold().Font.SetFontSize(14).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        worksheet.Range($"A3:{lastColumn}3").Merge().Style.Font.SetItalic().Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        worksheet.Range($"A4:{lastColumn}4").Merge().Style.Font.SetItalic().Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);

        worksheet.Row(5).InsertRowsBelow(1); // Space before table

        // Insert table starting at A6
        var range = worksheet.Cell("A6").InsertTable(dataTable.AsEnumerable());
        worksheet.Columns().AdjustToContents();

        // Totals


        int totalRowIndex = 6 + dataTable.Rows.Count + 1;

        worksheet.Cell(totalRowIndex, 1).Value = "Total";
        worksheet.Cell(totalRowIndex, 1).Style.Font.SetBold();
        worksheet.Range(totalRowIndex, 1, totalRowIndex, 3).Merge().Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

        worksheet.Cell(totalRowIndex, 4).Value = totalDr;
        worksheet.Cell(totalRowIndex, 5).Value = totalCr;
        worksheet.Cell(totalRowIndex, 6).Value = totalDiff;

        for (int col = 4; col <= 6; col++)
        {
            worksheet.Cell(totalRowIndex, col).Style.Font.SetBold();
            worksheet.Cell(totalRowIndex, col).Style.NumberFormat.Format = "#,##0.00";
        }

    }

}