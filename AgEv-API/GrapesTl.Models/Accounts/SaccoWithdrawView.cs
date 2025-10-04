using System;

namespace GrapesTl.Models;

public class SaccoWithdrawView
{
    public string SaccoId { get; set; }
    public string BranchName { get; set; }
    public string DepartmentName { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string DesignationName { get; set; }
    public string ContactNumber { get; set; }
    public DateTime WorkDate { get; set; }
    public string Particulars { get; set; }
    public double Withdraw { get; set; }

}
