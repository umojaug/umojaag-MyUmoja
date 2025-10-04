namespace GrapesTl.Service;
public interface IPdfReportGenerator
{
    string Key { get; } // acts like "reportType"
    Task<byte[]> GenerateAsync(ReportParams model);
}
