namespace GrapesTl.Service;
public class ChartOfAccountXlsxGenerator(IUnitOfWork unitOfWork) : IReportGenerator
{
    public string Key => "chartOfAccountsXlsx";
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    private async Task<List<ChartOfAccountDto>> GetDataAsync(ReportParams model)
    {
        var parameter = new DynamicParameters();
        string spName;
        if (model.DisplayAt == "BR")
        {
            parameter.Add("@BranchIds", model.BranchIds);
            spName = "AcFisCoAGetOnlyBr";
        }
        else
        {
            parameter.Add("@DisplayAt", model.DisplayAt);
            spName = "AcFisCoAGetAll";
        }

        var data = (await _unitOfWork.SP_Call.List<ChartOfAccountDto>(spName, parameter)).ToList();
        return data;
    }

    public async Task GenerateAsync(XLWorkbook workbook, ReportParams model)
    {
        var data = await GetDataAsync(model);

        var worksheet = workbook.Worksheets.Add("Data");
        worksheet.Cell("A2").Value = "Character Of Account";
        worksheet.Cell("A2").Style.Font.SetBold().Font.SetFontSize(14).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

        if (data.Count == 0)
        {
            worksheet.Cell("A3").Value = SD.Message_NotFound;
            worksheet.Columns().AdjustToContents();
            return;
        }

        var columnsToInclude = new Dictionary<string, string>
            {
                { "MainName", "Main Name" },
                { "GroupName", "Group Name" },
                { "SubGroupName", "Sub-Group Name" },
                { "LedgerCode", "Ledger Code" },
                { "BranchName", "Branch Name" },
                { "LedgerName", "Ledger Name" },
                { "DisplayAt", "Display At" },
                { "VoucherType", "Voucher Type" },
                { "AccountType", "Account Type" },
                { "ClassificationName", "Classification Name" }

            };

        var filteredLedgerData = data.Select(item => new
        {
            item.MainName,
            item.GroupName,
            item.SubGroupName,
            item.LedgerCode,
            item.BranchName,
            item.LedgerName,
            item.DisplayAt,
            item.VoucherType,
            item.AccountType,
            item.ClassificationName
        }).ToList();

        DataTable dataTable = filteredLedgerData.ToDataTable(columnsToInclude.Keys.ToList());
        foreach (var pair in columnsToInclude)
        {
            if (dataTable.Columns.Contains(pair.Key))
            {
                dataTable.Columns[pair.Key].ColumnName = pair.Value;
            }
        }
        ;

        //Header
        worksheet.Cell("A1").Value = data.First().CompanyName;
        worksheet.Cell("A2").Value = "All Ledger List Report";
        //date
        string lastColumnLetter = ((char)('A' + dataTable.Columns.Count - 1)).ToString();
        worksheet.Range($"A1:{lastColumnLetter}1").Merge();
        worksheet.Range($"A2:{lastColumnLetter}2").Merge();
        worksheet.Cell("A1").Style.Font.SetBold().Font.SetFontSize(16).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        worksheet.Cell("A2").Style.Font.SetBold().Font.SetFontSize(14).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        worksheet.Row(3).InsertRowsBelow(1);

        string lastColumn = ((char)('A' + dataTable.Columns.Count - 1)).ToString();
        worksheet.Range($"A1:{lastColumn}1").Merge();
        worksheet.Range($"A2:{lastColumn}2").Merge();
        worksheet.Cell("A1").Style.Font.SetBold().Font.SetFontSize(16).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        worksheet.Cell("A2").Style.Font.SetBold().Font.SetFontSize(14).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        worksheet.Row(5).InsertRowsBelow(1);

        var range = worksheet.Cell("A6").InsertTable(dataTable.AsEnumerable());
        worksheet.Columns().AdjustToContents();
    }
}