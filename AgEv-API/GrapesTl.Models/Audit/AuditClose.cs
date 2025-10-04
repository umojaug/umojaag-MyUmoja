using System;

namespace GrapesTl.Models;

public class AuditClose
{
    public string WorkPlanId { get; set; }
    public string AuditYear { get; set; }
    public string MonthName { get; set; }
    public string BranchId { get; set; }
    public string OverallRiskRating { get; set; }
    public string Auditor { get; set; }
    public string FieldDays { get; set; }
    public string ExpectedCost { get; set; }
    public string AuditStatus { get; set; }
    public string ReportStatus { get; set; }
    public string DiscussionStatus { get; set; }
    public string FollowUpStatus { get; set; }
    public string AuName { get; set; }
    public string EmployeeName { get; set; }
    public string AuditorName { get; set; }
    public DateTime EntryDate { get; set; }


}


