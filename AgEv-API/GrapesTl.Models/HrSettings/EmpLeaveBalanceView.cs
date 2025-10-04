namespace GrapesTl.Models;

public class EmpLeaveBalanceView
{
    public long BookId { get; set; }
    public string LeaveName { get; set; }
    public double YearlyLeave { get; set; }
    public double Availed { get; set; }
    public double Balance { get; set; }

}

public class EmpLeavebookView
{
    public string BranchName { get; set; }
    public string DepartmentName { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string DesignationName { get; set; }
    public int Ale { get; set; }
    public int Al { get; set; }
    public int Comp { get; set; }
    public int Mtl { get; set; }
    public int Pat { get; set; }
    public int Sl { get; set; }
    public int Stu { get; set; }
    public int Md { get; set; }
}
