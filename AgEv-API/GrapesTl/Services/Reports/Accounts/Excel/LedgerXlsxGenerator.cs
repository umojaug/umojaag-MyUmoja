namespace GrapesTl.Service;
public class LedgerXlsxGenerator(IUnitOfWork unitOfWork) : IReportGenerator
{
    public string Key => "ledgerXlsx";
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    private async Task<List<LedgerExcelDto>> GetDataAsync(ReportParams model)
    {

        var parameter = new DynamicParameters();
        parameter.Add("@BranchIds", model.BranchIds);
        parameter.Add("@LedgerId", model.LedgerId);
        parameter.Add("@FromDate", model.FromDate);
        parameter.Add("@TillDate", model.TillDate);

        var data = (await _unitOfWork.SP_Call.List<LedgerExcelDto>("AcFisLedgerGetAll", parameter)).ToList();
        return data;

    }


    public async Task GenerateAsync(XLWorkbook workbook, ReportParams model)
    {
        var data = await GetDataAsync(model);

        var worksheet = workbook.Worksheets.Add("Data");
        worksheet.Cell("A2").Value = "Ledger";
        worksheet.Cell("A2").Style.Font.SetBold().Font.SetFontSize(14).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

        if (data.Count == 0)
        {
            worksheet.Cell("A3").Value = SD.Message_NotFound;
            worksheet.Columns().AdjustToContents();
            return;
        }

        var columnsToInclude = new Dictionary<string, string>
        {
            { "Workdate", "Work Date" },
            { "Particulars", "Particulars" },
            { "VoucherNo", "Voucher Number" },
            { "Dr",  $"Debit ({SD.Currency})" },
            { "Cr",  $"Credit ({SD.Currency})" },
            { "ClosingBalance", "Closing Balance" },
        };

        var filteredLedgerData = data.Select(item => new
        {
            item.WorkDate,
            item.Particulars,
            item.VoucherNo,
            item.Dr,
            item.Cr,
            item.ClosingBalance,
        }).ToList();

        DataTable dataTable = filteredLedgerData.ToDataTable(columnsToInclude.Keys.ToList());
        foreach (var pair in columnsToInclude)
        {
            if (dataTable.Columns.Contains(pair.Key))
            {
                dataTable.Columns[pair.Key].ColumnName = pair.Value;
            }
        }



        // Upper Header
        worksheet.Cell("A1").Value = data.First().CompanyName;
        // Merge A1 across for the company name, for example A1:F1
        worksheet.Range("A1:F1").Merge();
        worksheet.Cell("A1").Style.Font.SetBold().Font.SetFontSize(16).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

        // Now, set the AccountName or "Ledger" in a separate row, perhaps A2, also merged if desired
        worksheet.Cell("A2").Value = data.First().AccountName; // Or "Ledger" if it's a fixed title
                                                               // Merge A2 across for the account name/ledger title, for example A2:F2
        worksheet.Range("A2:F2").Merge();
        worksheet.Cell("A2").Style.Font.SetBold().Font.SetFontSize(14).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

        // Adjust starting row for the balance summary if needed, based on the previous merges
        worksheet.Cell("E4").Value = "Opening Balance :"; // Changed from E6 to E4
        worksheet.Cell("F4").Value = data.First().ClosingBalance;
        worksheet.Cell("E5").Value = "Current Total Debit :"; // Changed from E7 to E5
        worksheet.Cell("F5").Value = data.Sum(item => item.Dr);
        worksheet.Cell("E6").Value = "Current Total Credit :"; // Changed from E8 to E6
        worksheet.Cell("F6").Value = data.Sum(item => item.Cr);
        worksheet.Cell("E7").Value = "Closing Balance :"; // Changed from E9 to E7
        worksheet.Cell("F7").Value = data.Last().ClosingBalance;
        worksheet.Range("E4:F7").Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right); // Adjust range

        var range = worksheet.Cell("A8").InsertTable(dataTable.AsEnumerable()); // Adjust the starting row for the table.


        // Fix: Replace `range.RowNumber()` with `range.RangeAddress.FirstAddress.RowNumber`
        _ = worksheet.Row(range.RangeAddress.FirstAddress.RowNumber + dataTable.Rows.Count).InsertRowsBelow(1);

        // Lower Footer (optional, repeating the balances)
        worksheet.Cell($"E{range.RangeAddress.FirstAddress.RowNumber + dataTable.Rows.Count + 1}").Value = "Opening Balance :";
        worksheet.Cell($"F{range.RangeAddress.FirstAddress.RowNumber + dataTable.Rows.Count + 1}").Value = data.First().ClosingBalance;
        worksheet.Cell($"E{range.RangeAddress.FirstAddress.RowNumber + dataTable.Rows.Count + 2}").Value = "Current Total Debit :";
        worksheet.Cell($"F{range.RangeAddress.FirstAddress.RowNumber + dataTable.Rows.Count + 2}").Value = data.Sum(item => item.Dr);
        worksheet.Cell($"E{range.RangeAddress.FirstAddress.RowNumber + dataTable.Rows.Count + 3}").Value = "Current Total Credit :";
        worksheet.Cell($"F{range.RangeAddress.FirstAddress.RowNumber + dataTable.Rows.Count + 3}").Value = data.Sum(item => item.Cr);
        worksheet.Cell($"E{range.RangeAddress.FirstAddress.RowNumber + dataTable.Rows.Count + 4}").Value = "Closing Balance :";
        worksheet.Cell($"F{range.RangeAddress.FirstAddress.RowNumber + dataTable.Rows.Count + 4}").Value = data.Last().ClosingBalance;
        worksheet.Range($"E{range.RangeAddress.FirstAddress.RowNumber + dataTable.Rows.Count + 1}:F{range.RangeAddress.FirstAddress.RowNumber + dataTable.Rows.Count + 4}").Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right);

        worksheet.Columns().AdjustToContents();
    }
}