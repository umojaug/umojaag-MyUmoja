namespace GrapesTl.Service;
public class TrialBalanceXlsxGenerator(IUnitOfWork unitOfWork) : IReportGenerator
{
    public string Key => "trialBalanceXlsx";
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    private async Task<List<TrialBalanceDto>> GetDataAsync(ReportParams model)
    {
        var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == model.UserId);

        var spName = "";
        var roles = "Branch Manager,Area Manager,Regional Manager,Divisional Manager";

        var parameter = new DynamicParameters();
        parameter.Add("@FromDate", model.FromDate);
        parameter.Add("@TillDate", model.TillDate);


        if (!roles.Contains(user.Role))
        {
            spName = "AcFisTrialBalanceGetAll";
        }
        else
        {
            parameter.Add("@BranchIds", model.BranchIds);
            spName = "AcFisTrialBalanceGetByBranch";
        }

        var data = (await _unitOfWork.SP_Call.List<TrialBalanceDto>(spName, parameter)).ToList();
        return data;
    }
    public async Task GenerateAsync(XLWorkbook workbook, ReportParams model)
    {
        var data = await GetDataAsync(model);

        var worksheet = workbook.Worksheets.Add("Data");
        worksheet.Cell("A2").Value = "Trial Balance";
        worksheet.Cell("A2").Style.Font.SetBold().Font.SetFontSize(14).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

        if (data.Count == 0)
        {
            worksheet.Cell("A3").Value = SD.Message_NotFound;
            worksheet.Columns().AdjustToContents();
            return;
        }

        var columnsToInclude = new Dictionary<string, string>
    {
        { "LedgerCode", "Ledger Code" },
        { "LedgerName", "Ledger Name" },
        { "OpeningBalance", "Opening Balance" },
        { "Dr",  $"Debit ({SD.Currency})" },
        { "Cr",  $"Credit ({SD.Currency})" },
        { "ClosingBalance", "Closing Balance" },
    };

        var filteredLedgerData = data.Select(item => new
        {
            item.LedgerCode,
            item.LedgerName,
            item.OpeningBalance,
            item.Dr,
            item.Cr,
            item.ClosingBalance,
        }).ToList();

        DataTable dataTable = filteredLedgerData.ToDataTable(columnsToInclude.Keys.ToList());

        // Rename columns
        foreach (var pair in columnsToInclude)
        {
            if (dataTable.Columns.Contains(pair.Key))
            {
                dataTable.Columns[pair.Key].ColumnName = pair.Value;
            }
        }

        // Header
        worksheet.Cell("A1").Value = data.First().CompanyName;
        worksheet.Cell("A2").Value = "Trial Balance";

        string lastColumnLetter = ((char)('A' + dataTable.Columns.Count - 1)).ToString();
        worksheet.Range($"A1:{lastColumnLetter}1").Merge().Style.Font.SetBold().Font.SetFontSize(16).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        worksheet.Range($"A2:{lastColumnLetter}2").Merge().Style.Font.SetBold().Font.SetFontSize(14).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

        worksheet.Row(3).InsertRowsBelow(1);
        worksheet.Row(5).InsertRowsBelow(1);

        var range = worksheet.Cell("A6").InsertTable(dataTable.AsEnumerable());
        worksheet.Columns().AdjustToContents();

        // Totals
        decimal totalOpening = data.Sum(x => x.OpeningBalance);
        double totalDr = data.Sum(x => x.Dr);
        double totalCr = data.Sum(x => x.Cr);
        decimal totalClosing = data.Sum(x => x.ClosingBalance);

        int totalRowIndex = 6 + dataTable.Rows.Count + 1;

        worksheet.Cell($"A{totalRowIndex}").Value = "Total";
        worksheet.Cell($"A{totalRowIndex}").Style.Font.SetBold();

        worksheet.Cell(totalRowIndex, 3).Value = totalOpening;
        worksheet.Cell(totalRowIndex, 4).Value = totalDr;
        worksheet.Cell(totalRowIndex, 5).Value = totalCr;
        worksheet.Cell(totalRowIndex, 6).Value = totalClosing;

        for (int col = 3; col <= 6; col++)
        {
            worksheet.Cell(totalRowIndex, col).Style.Font.SetBold();
            worksheet.Cell(totalRowIndex, col).Style.NumberFormat.Format = "#,##0.00";
        }
    }

}