using System.Collections;

namespace GrapesTl.Models;

public class EmployeeGetAll : Employee
{
    public string EmployeeResignId { get; set; }
    public string BranchName { get; set; }
    public string DepartmentName { get; set; }
    public string EmployeePin { get; set; }
    public string DesignationName { get; set; }
    public string ResignReasonName { get; set; }
    public string Particulars { get; set; }
    public int TenureYear { get; set; }
    public int TenureMonth { get; set; }
    //public double Balance { get; set; }
    public double OpeningBalance { get; set; }
    public double ClosingBalance { get; set; }
    public double TransactionBalance { get; set; }
    public string ResignDate { get; set; }
    public string SalaryYearMonth { get; set; }
    public int YearInService { get; set; }
    public string Role { get; set; }
    public string BankName { get; set; }
    public bool IsActive { get; set; }

}

public class EmpSearch
{
    public string OldBranchId { get; set; }
    public string OldDepartmentId { get; set; }
    public string OldStaffTypeId { get; set; }
}

public class EmpForSelect
{
    public string EmployeeId { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
}