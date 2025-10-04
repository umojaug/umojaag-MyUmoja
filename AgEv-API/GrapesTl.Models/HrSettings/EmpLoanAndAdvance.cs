namespace GrapesTl.Models;

public class EmpLoanAndAdvance
{
    public string LoanAndAdvanceId { get; set; }
    public string EmployeeId { get; set; }
    public string LoanAmount { get; set; }
    public double NumberOfInstallment { get; set; }
    public double InstallmentAmount { get; set; }
}
