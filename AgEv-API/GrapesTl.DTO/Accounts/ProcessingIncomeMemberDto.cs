using System;

namespace GrapesTl.Dto;


public class ProcessingIncomeMemberDto
{
    public int SL { get; set; }
    public string CompanyName { get; set; }
    public string BranchName { get; set; }
    public string GroupName { get; set; }
    public string Client { get; set; }
    public string LoanNoCycle { get; set; }
    public string InstallmentPeriod { get; set; }
    public string LoanType { get; set; }
    public DateTime DisbursementDate { get; set; }
    public decimal DisbursedAmount { get; set; }

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

    // Amortized to P&L
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



