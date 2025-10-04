namespace GrapesTl.Models;

public class BmBankInfo
{
    public long OpsBmBankInfoId { get; set; }
    public string BmVisitId { get; set; }
    public string FundReceivedBranch { get; set; }
    public double FundReceivedAmount { get; set; }
    public string FundTransferBranch { get; set; }
    public double FundTransferAmount { get; set; }
    public double BankWithdraw { get; set; }
    public double BankDeposit { get; set; }
    public double BankBalance { get; set; }
}
