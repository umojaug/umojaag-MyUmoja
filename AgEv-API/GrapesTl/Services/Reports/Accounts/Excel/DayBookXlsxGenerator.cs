namespace GrapesTl.Service;
public class DayBookXlsxGenerator(IUnitOfWork unitOfWork) : IReportGenerator
{
    public string Key => "dayBookXlsx";
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    private async Task<List<DayBookDto>> GetDataAsync(ReportParams model)
    {
        var parameter = new DynamicParameters();
        parameter.Add("@BranchIds", model.BranchIds);
        parameter.Add("@FromDate", model.FromDate);
        parameter.Add("@TillDate", model.TillDate);

        var data = (await _unitOfWork.SP_Call.List<DayBookDto>("AcFisDayBookGetAll", parameter)).ToList();
        return data;
    }

    public async Task GenerateAsync(XLWorkbook workbook, ReportParams model)
    {
        var data = await GetDataAsync(model);

        var worksheet = workbook.Worksheets.Add("Data");
        worksheet.Cell("A2").Value = "Day Book";
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
        { "VoucherNo", "Voucher Number" },
        { "VoucherReference", "Voucher Type" },
        { "AccountName", "Account Name" },
        { "Particulars", "Particulars" },
        { "Dr",  $"Debit ({SD.Currency})" },
        { "Cr",  $"Credit ({SD.Currency})" },
    };


        var filteredData = data.Select((item, index) => new
        {
            SL = index + 1,
            item.WorkDate,
            item.VoucherNo,
            item.VoucherReference,
            item.AccountName,
            item.Particulars,
            item.Dr,
            item.Cr
        }).ToList();


        var extendedColumns = new Dictionary<string, string> { { "SL", "SL#" } };
        foreach (var col in columnsToInclude)
            extendedColumns.Add(col.Key, col.Value);

        DataTable dataTable = filteredData.ToDataTable(extendedColumns.Keys.ToList());

        // Rename DataTable headers
        foreach (var pair in extendedColumns)
        {
            if (dataTable.Columns.Contains(pair.Key))
                dataTable.Columns[pair.Key].ColumnName = pair.Value;
        }

        // Header content
        worksheet.Cell("A1").Value = data.First().CompanyName;
        worksheet.Cell("A3").Value = $"Report Date: {DateTime.Now:yyyy-MM-dd HH:mm:ss}";
        worksheet.Cell("A4").Value = $"From Date: {model.FromDate:yyyy-MM-dd} - To Date: {model.TillDate:yyyy-MM-dd}";

        string lastColLetter = ((char)('A' + dataTable.Columns.Count - 1)).ToString();
        worksheet.Range($"A1:{lastColLetter}1").Merge().Style.Font.SetBold().Font.SetFontSize(16).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        worksheet.Range($"A2:{lastColLetter}2").Merge().Style.Font.SetBold().Font.SetFontSize(14).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        worksheet.Range($"A3:{lastColLetter}3").Merge().Style.Font.SetItalic().Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        worksheet.Range($"A4:{lastColLetter}4").Merge().Style.Font.SetItalic().Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);

        worksheet.Row(5).InsertRowsBelow(1);

        // Insert data table
        var range = worksheet.Cell("A6").InsertTable(dataTable.AsEnumerable());
        worksheet.Columns().AdjustToContents();

        // Totals
        double totalDr = data.Sum(x => x.Dr);
        double totalCr = data.Sum(x => x.Cr);

        int totalRowIndex = 6 + dataTable.Rows.Count + 1;

        worksheet.Cell(totalRowIndex, 1).Value = "Total";
        worksheet.Range(totalRowIndex, 1, totalRowIndex, 6).Merge().Style.Font.SetBold().Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

        worksheet.Cell(totalRowIndex, 7).Value = totalDr;
        worksheet.Cell(totalRowIndex, 8).Value = totalCr;

        for (int col = 4; col <= 5; col++)
        {
            worksheet.Cell(totalRowIndex, col).Style.Font.SetBold();
            worksheet.Cell(totalRowIndex, col).Style.NumberFormat.Format = "#,##0.00";
        }
    }

}