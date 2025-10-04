namespace GrapesTl.Service;
public class InterestIncomeXlsxGenerator(IUnitOfWork unitOfWork) : IReportGenerator
{
    public string Key => "interestIncomeXlsx";
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    private async Task<List<IntarestInocmeDto>> GetDataAsync(ReportParams model)
    {
        var parameter = new DynamicParameters();
        parameter.Add("@BranchIds", model.BranchIds);
        parameter.Add("@FromDate", model.FromDate);
        parameter.Add("@TillDate", model.TillDate);

        var data = (await _unitOfWork.SP_Call.List<IntarestInocmeDto>("AcFisInterestIncome", parameter)).ToList();
        return data;
    }

    public async Task GenerateAsync(XLWorkbook workbook, ReportParams model)
    {
        var data = await GetDataAsync(model);

        var worksheet = workbook.Worksheets.Add("Data");
        worksheet.Cell("A2").Value = "Interest Income Report";
        worksheet.Cell("A2").Style.Font.SetBold().Font.SetFontSize(14).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

        if (data.Count == 0)
        {
            worksheet.Cell("A3").Value = SD.Message_NotFound;
            worksheet.Columns().AdjustToContents();
            return;
        }

        var columnsToInclude = new Dictionary<string, string>
        {
            { "SL", "SL#" },
            { "BranchName", "Branch Name" },
            { "GroupName", "Group Name" },
            { "ClientCode", "Client Code" },
            { "ClientName", "Client Name" },
            { "LoanType", "Loan Type" },
            { "LoanAccountNo", "Loan Account No." },
            { "DisburseDate", "Disburse Date" },
            { "PrincipalDisbursedAmount", "Principal Disbursed Amount" },
            { "InterestDisbursedAmount", "Interest Disbursed Amount" },
            { "TotalDisbursedAmount", "Total Disbursed Amount" },
            { "FirstInstallmentDate", "First Installment Date" },
            { "InterestRate", "Interest Rate (%)" },
            { "TotalInstallment", "Total Installment" },
            { "PrincipalRealized", "Principal Realized" },
            { "InterestRealized", "Interest Realized" },
            { "TotalRealized", "Total Realized" },
            { "TotalOverdue", "Total Overdue" },
            { "PrincipalOutstanding", "Principal Outstanding" },
            { "InterestOutstanding", "Interest Outstanding" },
            { "TotalOutstanding", "Total Outstanding" },
            { "UnearnedInterestIncome", "Unearned Interest Income" },
            { "InterestIncomeForThePeriod", "Interest Income (Period)" },
            { "LastPaymentDate", "Last Payment Date" }
        }; DataTable dataTable = data.ToDataTable(columnsToInclude.Keys.ToList());
        // Rename columns
        foreach (var pair in columnsToInclude)
        {
            if (dataTable.Columns.Contains(pair.Key))
                dataTable.Columns[pair.Key].ColumnName = pair.Value;
        }
        // Calculate totals


        DataRow totalRow = dataTable.NewRow();




        dataTable.Rows.Add(totalRow);

        worksheet.Cell("A1").Value = data.First().CompanyName;
        worksheet.Cell("A3").Value = $"Report Date: {DateTime.Now:yyyy-MM-dd HH:mm:ss}";
        worksheet.Cell("A4").Value = $"From Date: {model.FromDate:yyyy-MM-dd} - To Date: {model.TillDate:yyyy-MM-dd}";

        string lastColumnLetter = ((char)('A' + dataTable.Columns.Count - 1)).ToString();

        worksheet.Range($"A1:{lastColumnLetter}1").Merge().Style.Font.SetBold().Font.SetFontSize(16).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        worksheet.Range($"A2:{lastColumnLetter}2").Merge().Style.Font.SetBold().Font.SetFontSize(14).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        worksheet.Range($"A3:{lastColumnLetter}3").Merge().Style.Font.SetItalic().Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        worksheet.Range($"A4:{lastColumnLetter}4").Merge().Style.Font.SetItalic().Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
        worksheet.Range($"A5:{lastColumnLetter}5").Merge().Style.Font.SetItalic().Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);

        var range = worksheet.Cell("A7").InsertTable(dataTable.AsEnumerable());

        worksheet.Columns().AdjustToContents();

        int lastRow = 7 + data.Count;
        var totalRowRange = worksheet.Range(lastRow + 1, 1, lastRow + 1, dataTable.Columns.Count);
        totalRowRange.Style.Font.SetBold();

        // Format columns
        string[] numberCols = {


        };
        foreach (string colName in numberCols)
        {
            if (dataTable.Columns.Contains(colName))
            {
                int colIndex = dataTable.Columns[colName].Ordinal + 1;
                worksheet.Cell(lastRow + 1, colIndex).Style.NumberFormat.Format = "#,##0.00";
            }
        }
    }
}