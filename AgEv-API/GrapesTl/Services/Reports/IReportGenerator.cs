namespace GrapesTl.Service;
public interface IReportGenerator
{
    string Key { get; } // acts like "reportType"
    Task GenerateAsync(XLWorkbook workbook, ReportParams model);

}
