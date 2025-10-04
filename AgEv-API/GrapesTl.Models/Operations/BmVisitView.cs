using System;

namespace GrapesTl.Models;

public class BmVisitView
{
    public string BmVisitId { get; set; }
    public DateTime VisitDate { get; set; }
    public DateTime SubmitDate { get; set; }
    public string VisitType { get; set; }
    public string StayOvernight { get; set; }
    public string BranchName { get; set; }
    public string ManagerName { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string DesignationName { get; set; }
    public int IsSubmit { get; set; }
    public int IsLock { get; set; }
    public string RejectRemarks { get; set; }
    public string AcceptRemarks { get; set; }
    public string SubmitRemarks { get; set; }
}
