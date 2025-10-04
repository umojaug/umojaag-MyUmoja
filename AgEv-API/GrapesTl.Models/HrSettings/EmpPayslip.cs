using System;
namespace GrapesTl.Models;

public class EmpPayslip : Employee
{
    public string EmpPayrollId { get; set; }
    public int SalaryYear { get; set; }
    public int SalaryMonth { get; set; }
    public DateTime SalaryMonthYear { get; set; }
    public string CompanyName { get; set; }
    public string BranchName { get; set; }
    public string DepartmentName { get; set; }
    public string EmployeePin { get; set; }
    public string DesignationName { get; set; }
    public double NetPayment { get; set; }
    public string BankName { get; set; }
    public string StaffStatus { get; set; }
    public bool StopPayment { get; set; }
    public string StopParticulars { get; set; }
    public int TotalNoofDays { get; set; }
    public double ProratedGrossSalary { get; set; }
    public double OthersAllowance { get; set; }
    public double Bonus { get; set; }
    public string GrossWithBonus { get; set; }
    public double Lst { get; set; }
    public double PgsLst { get; set; }
    public double NssfEmployee { get; set; }
    public double Napsa { get; set; }
    public double TaxPaye { get; set; }
    public double TotalDeduction { get; set; }
    public double SaccoPayment { get; set; }
    public double AdvanceDeductions { get; set; }
    public double SaccoLoanRePaymentDeduction { get; set; }
    public double SalaryRefund { get; set; }
    public double LostDeduction { get; set; }
    public double NapsaEmployer { get; set; }
    public double TotalNapsa { get; set; }
    public double NhimaEmployer { get; set; }
    public double TotalNhima { get; set; }
    public double NssfEmployer { get; set; }
    public double TraineeArrears { get; set; }
    public double TotalNssf { get; set; }
}
