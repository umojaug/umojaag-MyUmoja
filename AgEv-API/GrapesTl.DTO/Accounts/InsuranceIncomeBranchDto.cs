namespace GrapesTl.Dto;


public class InsuranceIncomeBranchDto
{
    public int SL { get; set; }
    public string CompanyName { get; set; }
    public string BranchName { get; set; }
    public string LoanType { get; set; }

    // Disbursement Amount
    public decimal DisbursementUML { get; set; }
    public decimal DisbursementUBL { get; set; }
    public decimal DisbursementUAL { get; set; }

    // Opening Balance
    public decimal OpeningBalanceUML { get; set; }
    public decimal OpeningBalanceUBL { get; set; }
    public decimal OpeningBalanceUAL { get; set; }

    // Deposit
    public decimal DepositUML { get; set; }
    public decimal DepositUBL { get; set; }
    public decimal DepositUAL { get; set; }

    // Amortization to P & L
    public decimal AmortizedUML { get; set; }
    public decimal AmortizedUBL { get; set; }
    public decimal AmortizedUAL { get; set; }

    // Amount Settled Against Death
    public decimal DeathSettlementUML { get; set; }
    public decimal DeathSettlementUBL { get; set; }
    public decimal DeathSettlementUAL { get; set; }

    // Closing Balance
    public decimal ClosingBalanceUML { get; set; }
    public decimal ClosingBalanceUBL { get; set; }
    public decimal ClosingBalanceUAL { get; set; }
}