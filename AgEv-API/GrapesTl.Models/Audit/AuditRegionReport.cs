namespace GrapesTl.Models;

public class AuditRegionReport
{
    public string ReportId { get; set; }
    public string Year { get; set; }
    public string ReportingQuarter { get; set; }
    public string MonthOfAudit { get; set; }
    public string DepartmentId { get; set; }
    public string RegionId { get; set; }
    public string RegionOverview { get; set; }

}

public class AuditRegionReportView : AuditRegionReport
{
    public string RegionName { get; set; }
    public string DepartmentName { get; set; }


}

