namespace GrapesTl.Models;

public class AuditBranchReport
{
    public string ReportId { get; set; }
    public string Year { get; set; }
    public string ReportingQuarter { get; set; }
    public string MonthOfAudit { get; set; }
    public string DepartmentId { get; set; }
    public string BranchId { get; set; }
    public string BranchOverview { get; set; }
}


public class AuditBranchReportView : AuditBranchReport
{

    public string DepartmentName { get; set; }
    public string BranchName { get; set; }
    public string RegionName { get; set; }

}



