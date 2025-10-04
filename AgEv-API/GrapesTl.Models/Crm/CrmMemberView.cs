using System;

namespace GrapesTl.Models;

public class CrmMemberView
{
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string LoContactNumber { get; set; }
    public string BranchName { get; set; }
    public string MemberId { get; set; }
    public string MemberName { get; set; }
    public int TotalFamilyMembers { get; set; }
    public string ContactAddress { get; set; }
    public string HouseStatus { get; set; }
    public string ContactNumber { get; set; }
    public string TypeOfBusiness { get; set; }
    public double MonthlyIncome { get; set; }
    public double OthersIncome { get; set; }
    public string LoanFromOtherMfi { get; set; }
    public double ExpectedLoanAmount { get; set; }
    public string PotentialForLoan { get; set; }
    public DateTime EntryDate { get; set; }
}
