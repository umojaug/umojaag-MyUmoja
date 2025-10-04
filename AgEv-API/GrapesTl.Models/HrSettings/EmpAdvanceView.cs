using System;

namespace GrapesTl.Models;

public class EmpAdvanceView
{
    public long AdvanceId { get; set; }
    public string BranchName { get; set; }
    public string DepartmentName { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string DesignationName { get; set; }
    public string AdvanceStatus { get; set; }
    public string AuthorityComments { get; set; }
    public string HrComments { get; set; }
    public string AuthorityName { get; set; }
    public DateTime NeededAdvanceDate { get; set; }
    public string PurposeOfAdvance { get; set; }
    public double AdvanceAmount { get; set; }
    public string EntryBy { get; set; }
    public DateTime EntryDate { get; set; }
    public string AuthDesignationName { get; set; }
    public string AuthDepartmentName { get; set; }
    public string HrEmployeeName { get; set; }
}
