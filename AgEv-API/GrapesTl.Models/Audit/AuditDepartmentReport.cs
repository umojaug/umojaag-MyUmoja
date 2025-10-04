namespace GrapesTl.Models;

public class AuditDepartmentReport
{
    public string ReportId { get; set; }
    public string Year { get; set; }
    public string ReportingQuarter { get; set; }
    public string MonthOfAudit { get; set; }
    public string DepartmentId { get; set; }
    public string DepartmentOverview { get; set; }

}

public class AuditDepartmentReportView : AuditDepartmentReport
{

    public string DepartmentName { get; set; }


}









