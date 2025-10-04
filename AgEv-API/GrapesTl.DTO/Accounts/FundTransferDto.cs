using System;

namespace GrapesTl.Dto;

public class FundTransferDto
{
    public string BranchId { get; set; }
    public double Amount { get; set; }
    public string Particulars { get; set; }
    public string BankId { get; set; }
    public string FundTransfersId { get; set; }
    public string FromBranch { get; set; }
    public string ToBranch { get; set; }
    public string TransactionNo { get; set; }
    public DateTime TransferDate { get; set; }
    public string Status { get; set; }

}




