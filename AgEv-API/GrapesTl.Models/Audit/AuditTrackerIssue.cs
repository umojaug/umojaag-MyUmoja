

using System;

namespace GrapesTl.Models;

public class AuditTrackerIssue
{
    public string AuditTrackerIssueId { get; set; }
    public string AuditType { get; set; }
    public string Year { get; set; }
    public string MonthOfAudit { get; set; }
    public string DepartmentId { get; set; }
    public string BranchId { get; set; }
    public string RegionId { get; set; }
    public string AuditIssue { get; set; }
    public string Risk { get; set; }
    public string Recommendations { get; set; }
    public string ImplementedBy { get; set; }
    public DateTime CommitmentDate { get; set; }
    public DateTime ImplementationDate { get; set; }
    public string IssueStatus { get; set; }
    public string IaInCharge { get; set; }
    public DateTime FollowUpDate { get; set; }
    public string Comments { get; set; }


}

public class AuditTrackerIssueView : AuditTrackerIssue
{
    public string DepartmentName { get; set; }
    public string BranchName { get; set; }
    public string RegionName { get; set; }
    public string ImplementedByName { get; set; }
    public string InChargeName { get; set; }
}



public class AuditTrackerIssueUpdate
{
    public string AuditTrackerIssueId { get; set; }
    public string IssueStatus { get; set; }
    public string Comments { get; set; }
    public DateTime FollowUpDate { get; set; }
    public DateTime ImplementationDate { get; set; }


}