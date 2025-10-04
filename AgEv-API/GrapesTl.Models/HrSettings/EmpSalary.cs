using System;

namespace GrapesTl.Models;

public class EmpSalary
{
    public long EmpPayrollId { get; set; }
    public int SalaryYear { get; set; }
    public int SalaryMonth { get; set; }
    public string CompanyName { get; set; }
    public string CompanyAddress { get; set; }
    public string BranchName { get; set; }
    public string DepartmentName { get; set; }
    public string EmployeeId { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string DesignationName { get; set; }
    public DateTime JoiningDate { get; set; }
    public double GrossSalaryUsd { get; set; }
    public double GrossSalary { get; set; }
    public string TotalNoofDays { get; set; }
    public string ProratedGrossSalary { get; set; }
    public int NssfEmployee { get; set; }
    public double TaxPaye { get; set; }
    public double SaccoDeduction { get; set; }
    public double TotalDeduction { get; set; }
    public double SaccoPayment { get; set; }
    public double AdvanceDeductions { get; set; }
    public double SaccoLoanRePaymentDeduction { get; set; }
    public double NetPayment { get; set; }
    public double NssfEmployer { get; set; }
    public double TotalNssf { get; set; }
    public double TraineeArrears { get; set; }
}
