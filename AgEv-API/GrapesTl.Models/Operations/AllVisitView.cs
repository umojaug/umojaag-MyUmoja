using System;

namespace GrapesTl.Models;

public class AllVisitView
{
    public string AllVisitId { get; set; }
    public DateTime VisitDate { get; set; }
    public DateTime VisitEndDate { get; set; }
    public DateTime EntryTime { get; set; }
    public DateTime ExitTime { get; set; }
    public DateTime SubmitDate { get; set; }
    public string VisitType { get; set; }
    public string StayOvernight { get; set; }
    public string BranchName { get; set; }
    public DateTime StartDate { get; set; }
    public string BranchManagerId { get; set; }
    public string ManagerId { get; set; }
    public string BranchManagerName { get; set; }
    public string ManagerName { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string DesignationName { get; set; }
    public string ManagerDesignation { get; set; }
    public string BmDesignation { get; set; }
    public int IsSubmit { get; set; }
    public int IsLock { get; set; }
    public string RejectRemarks { get; set; }
    public string AcceptRemarks { get; set; }
    public string SubmitRemarks { get; set; }
    public string CloseRemarks { get; set; }
}
