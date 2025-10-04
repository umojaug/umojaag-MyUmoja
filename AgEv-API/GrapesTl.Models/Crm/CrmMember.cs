namespace GrapesTl.Models;

public class CrmMember
{
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
}
