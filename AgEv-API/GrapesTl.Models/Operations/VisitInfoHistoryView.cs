using System;

namespace GrapesTl.Models;

public class VisitInfoHistoryView
{
    public string VisitId { get; set; }
    public DateTime VisitDate { get; set; }
    public string BranchName { get; set; }
    public string VisitType { get; set; }
    public string StayOvernight { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string DesignationName { get; set; }
}
