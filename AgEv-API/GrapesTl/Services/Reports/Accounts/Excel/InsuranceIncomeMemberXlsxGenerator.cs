using System.Reflection;

namespace GrapesTl.Service;
public class InsuranceIncomeMemberXlsxGenerator(IUnitOfWork unitOfWork) : IReportGenerator
{
    public string Key => "insuranceIncomeMemberXlsx";
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    private async Task<List<InsuranceIncomeMemeberDto>> GetDataAsync(ReportParams model)
    {
        var parameter = new DynamicParameters();
        parameter.Add("@BranchIds", model.BranchIds);
        parameter.Add("@FromDate", model.FromDate);
        parameter.Add("@TillDate", model.TillDate);

        var data = (await _unitOfWork.SP_Call.List<InsuranceIncomeMemeberDto>("AcFisInsuranceIncomeMember", parameter)).ToList();
        return data;
    }

    public async Task GenerateAsync(XLWorkbook workbook, ReportParams model)
    {
        var data = await GetDataAsync(model);

        var worksheet = workbook.Worksheets.Add("Data");
        worksheet.Cell("A2").Value = "Insurance Income Member Wise";
        worksheet.Cell("A2").Style.Font.SetBold().Font.SetFontSize(14).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

        if (data.Count == 0)
        {
            worksheet.Cell("A3").Value = SD.Message_NotFound;
            worksheet.Columns().AdjustToContents();
            return;
        }

        // Header info
        worksheet.Cell("A1").Value = data.First().CompanyName;
        worksheet.Cell("A3").Value = $"Report Date: {DateTime.Now:yyyy-MM-dd HH:mm:ss}";
        worksheet.Cell("A4").Value = $"From Date: {model.FromDate:yyyy-MM-dd} - To Date: {model.TillDate:yyyy-MM-dd}";
        //worksheet.Cell("A5").Value = $"Branch(es): {string.Join(", ", data.Select(d => d.BranchName).Distinct())}";

        var columnsToInclude = new List<(string Field, string Group, string Header)>
        {
            ("SL", "", "SL#"),
            ("BranchName", "", "Branch Name"),
            ("GroupName", "", "Group"),
            ("ClientCode", "", "Client Code"),
            ("ClientName", "", "Client"),
            ("LoanNo", "", "Loan No"),
            ("Cycle", "", "Cycle"),
            ("LoanType", "", "Loan Type"),
            ("CollectedBy", "", "Collected By"),
            ("DisbursementDate", "", "Disbursement Date"),
            ("DisbursedAmount", "", "Disbursed Amount"),

            // Opening Balances
            ("OpeningUML", "Opening Balance", "Opening UML"),
            ("OpeningUBL", "Opening Balance", "Opening UBL"),
            ("OpeningUAL", "Opening Balance", "Opening UAL"),
            ("OpeningTotal", "Opening Balance", "TOTAL"),

            // Deposits
            ("DepositeUML", "Deposit", "Deposite UML"),
            ("DepositeUBL", "Deposit", "Deposite UBL"),
            ("DepositeUAL", "Deposit", "Deposite UAL"),
            ("DepositeTotal", "Deposit", "TOTAL"),

            // Amortization
            ("AmortizedUML", "Amortization to P & L", "Amortized UML"),
            ("AmortizedUBL", "Amortization to P & L", "Amortized UBL"),
            ("AmortizedUAL", "Amortization to P & L", "Amortized UAL"),
            ("AmortizedTotal", "Amortization to P & L", "TOTAL"),

            // Death
            ("DeathUML", "Death Adjustment", "Death UML"),
            ("DeathUBL", "Death Adjustment", "Death UBL"),
            ("DeathUAL", "Death Adjustment", "Death UAL"),
            ("DeathTotal", "Death Adjustment", "TOTAL"),

            // Closing Balances
            ("ClosingUML", "Closing Balance", "Closing UML"),
            ("ClosingUBL", "Closing Balance", "Closing UBL"),
            ("ClosingUAL", "Closing Balance", "Closing UAL"),
            ("ClosingTotal", "Closing Balance", "TOTAL"),
        };




        // Create DataTable
        DataTable dataTable = new DataTable();
        Type dtoType = typeof(InsuranceIncomeMemeberDto);

        foreach (var colDef in columnsToInclude)
        {
            PropertyInfo prop = dtoType.GetProperty(colDef.Field);
            dataTable.Columns.Add(colDef.Field, Nullable.GetUnderlyingType(prop?.PropertyType ?? typeof(string)) ?? prop?.PropertyType ?? typeof(string));
        }

        foreach (var item in data)
        {
            var row = dataTable.NewRow();
            foreach (var colDef in columnsToInclude)
            {
                PropertyInfo prop = dtoType.GetProperty(colDef.Field);
                if (prop != null)
                    row[colDef.Field] = prop.GetValue(item) ?? DBNull.Value;
            }
            dataTable.Rows.Add(row);
        }

        // Total Row
        DataRow totalRow = dataTable.NewRow();
        if (dataTable.Columns.Contains("BranchName"))
            totalRow["BranchName"] = "Total";
        if (dataTable.Columns.Contains("SL"))
            totalRow["SL"] = DBNull.Value;

        foreach (DataColumn column in dataTable.Columns)
        {
            if (column.ColumnName is "SL" or "BranchName" || column.DataType == typeof(string))
                continue;

            if (column.DataType == typeof(decimal) || column.DataType == typeof(double) || column.DataType == typeof(int))
            {
                totalRow[column.ColumnName] = dataTable.AsEnumerable()
                    .Where(r => r[column.ColumnName] != DBNull.Value)
                    .Sum(r => Convert.ToDecimal(r[column.ColumnName]));
            }
        }
        dataTable.Rows.Add(totalRow);

        // Header rows
        int startDataRow = 7;
        int headerRow1 = startDataRow;
        int headerRow2 = startDataRow + 1;
        int currentCol = 1;

        var groupStartCols = new Dictionary<string, int>();

        foreach (var col in columnsToInclude)
        {
            worksheet.Cell(headerRow2, currentCol).Value = col.Header;
            worksheet.Cell(headerRow2, currentCol).Style.Font.SetBold().Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
            worksheet.Cell(headerRow2, currentCol).Style.Fill.SetBackgroundColor(XLColor.SkyBlue);

            if (!string.IsNullOrEmpty(col.Group) && !groupStartCols.ContainsKey(col.Group))
                groupStartCols[col.Group] = currentCol;

            currentCol++;
        }

        foreach (var group in groupStartCols)
        {
            int from = group.Value;
            int to = from + columnsToInclude.Count(c => c.Group == group.Key) - 1;

            worksheet.Range(headerRow1, from, headerRow1, to).Merge().Value = group.Key;
            worksheet.Range(headerRow1, from, headerRow1, to).Style.Font.SetBold().Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
            worksheet.Range(headerRow1, from, headerRow1, to).Style.Fill.SetBackgroundColor(XLColor.SkyBlue);
        }

        for (int i = 0; i < columnsToInclude.Count; i++)
        {
            if (string.IsNullOrEmpty(columnsToInclude[i].Group))
            {
                worksheet.Range(headerRow1, i + 1, headerRow2, i + 1).Merge().Value = columnsToInclude[i].Header;
                worksheet.Range(headerRow1, i + 1, headerRow2, i + 1).Style.Font.SetBold().Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                worksheet.Range(headerRow1, i + 1, headerRow2, i + 1).Style.Fill.SetBackgroundColor(XLColor.SkyBlue);
            }
        }

        worksheet.Cell(headerRow2 + 1, 1).InsertData(dataTable);

        int totalRowIndex = headerRow2 + 1 + dataTable.Rows.Count - 1;
        worksheet.Row(totalRowIndex).Style.Font.SetBold();

        foreach (var colDef in columnsToInclude)
        {
            if (colDef.Field.Contains("Count") || colDef.Field.Contains("Total") || colDef.Field.Contains("Balance") || colDef.Field.Contains("Incentive"))
            {
                int colIndex = dataTable.Columns[colDef.Field].Ordinal + 1;
                worksheet.Column(colIndex).CellsUsed().Style.NumberFormat.Format = "#,##0.00";
            }
        }

        worksheet.Columns().AdjustToContents();

        string lastColLetter = XLHelper.GetColumnLetterFromNumber(columnsToInclude.Count);
        worksheet.Range($"A1:{lastColLetter}1").Merge().Style.Font.SetBold().Font.SetFontSize(16).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        worksheet.Range($"A2:{lastColLetter}2").Merge().Style.Font.SetBold().Font.SetFontSize(14).Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        worksheet.Range($"A3:{lastColLetter}3").Merge().Style.Font.SetItalic().Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
        worksheet.Range($"A4:{lastColLetter}4").Merge().Style.Font.SetItalic().Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
        worksheet.Range($"A5:{lastColLetter}5").Merge().Style.Font.SetItalic().Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left);
    }
}