using System;

namespace GrapesTl.Models;
public class MasterRollView
{
    public int SL { get; set; }
    public string BranchName { get; set; }
    public string LoanOfficerName { get; set; }
    public string GroupName { get; set; }
    public string MemberName { get; set; }
    public string MemberNo { get; set; }
    public string NID { get; set; }
    public int LoanCycle { get; set; }
    public string LoanNo { get; set; }
    public string GuarantorName { get; set; }
    public string CategoryOfLoan { get; set; }
    public string TermOfLoan { get; set; }
    public string TypeOfBusiness { get; set; }
    public string MeetingDay { get; set; }
    public decimal SecurityDeposit { get; set; }
    public decimal ManagementFee { get; set; }
    public DateTime DisbursementDate { get; set; }
    public decimal PrincipalAmount { get; set; }
    public decimal TotalWithInterest { get; set; }
}
