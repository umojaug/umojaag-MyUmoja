using System;

namespace GrapesTl.Dto;


public class DeathRiskDto
{
    public int SL { get; set; }
    public string CompanyName { get; set; }
    public string BranchName { get; set; }
    public string ClientCode { get; set; }
    public string Client { get; set; }
    public string CollectedBy { get; set; }
    public string Group { get; set; }
    public string LoanNoCycle { get; set; }                       // Loan No (Cycle)
    public string LoanType { get; set; }
    public DateTime CollectionDate { get; set; }
    public decimal DisbursedAmount { get; set; }                  // (Principle Only)
    public decimal LoanOutstandingAmount { get; set; }            // (Principle + Interest)
    public decimal SettlementAgainstDeath90Percent { get; set; }
    public decimal SettlementAgainstDeath10Percent { get; set; }
    public decimal TotalSettlementAgainstDeath { get; set; }
    public string Status { get; set; }
}



