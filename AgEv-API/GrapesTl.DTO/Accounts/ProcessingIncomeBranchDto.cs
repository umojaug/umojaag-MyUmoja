namespace GrapesTl.Dto;


public class ProcessingIncomeBranchDto
{
    public int SL { get; set; }
    public string CompanyName { get; set; }
    public string BranchName { get; set; }
    public string LoanType { get; set; }

    // Disbursement
    public decimal DisbursementAmountUML { get; set; }
    public decimal DisbursementAmountUBL { get; set; }
    public decimal DisbursementAmountUAL { get; set; }
    public decimal DisbursementAmountTotal { get; set; }

    // Opening Balance
    public decimal OpeningBalanceUML { get; set; }
    public decimal OpeningBalanceUBL { get; set; }
    public decimal OpeningBalanceUAL { get; set; }
    public decimal OpeningBalanceTotal { get; set; }

    // Deposit
    public decimal DepositUML { get; set; }
    public decimal DepositUBL { get; set; }
    public decimal DepositUAL { get; set; }
    public decimal DepositTotal { get; set; }

    // Amortization to P&L
    public decimal AmortizedUML { get; set; }
    public decimal AmortizedUBL { get; set; }
    public decimal AmortizedUAL { get; set; }
    public decimal AmortizedTotal { get; set; }

    // Closing Balance
    public decimal ClosingBalanceUML { get; set; }
    public decimal ClosingBalanceUBL { get; set; }
    public decimal ClosingBalanceUAL { get; set; }
    public decimal ClosingBalanceTotal { get; set; }
}



