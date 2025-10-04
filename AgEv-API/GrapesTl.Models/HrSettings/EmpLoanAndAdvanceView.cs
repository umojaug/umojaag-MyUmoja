using System;

namespace GrapesTl.Models;

public class EmpLoanAndAdvanceView
{
    public string EmpHistoryId { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public double PreGrossSalaryUsd { get; set; }
    public double PreGrossSalary { get; set; }
    public DateTime EffectiveDate { get; set; }
    public string BranchName { get; set; }
    public string DepartmentName { get; set; }
    public double GrossSalaryUsd { get; set; }
    public double GrossSalary { get; set; }
    public string Particulars { get; set; }
}
