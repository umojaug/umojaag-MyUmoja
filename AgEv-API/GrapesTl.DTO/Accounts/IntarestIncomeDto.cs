using System;

namespace GrapesTl.Dto;


public class IntarestInocmeDto
{
    public string CompanyName { get; set; }
    public int SL { get; set; }
    public string BranchName { get; set; }
    public string GroupName { get; set; }
    public string ClientCode { get; set; }
    public string ClientName { get; set; }
    public string LoanType { get; set; }
    public string LoanAccountNo { get; set; }
    public DateTime DisburseDate { get; set; }
    public decimal PrincipalDisbursedAmount { get; set; }
    public decimal InterestDisbursedAmount { get; set; }
    public decimal TotalDisbursedAmount { get; set; }
    public DateTime FirstInstallmentDate { get; set; }
    public decimal InterestRate { get; set; }
    public int TotalInstallment { get; set; }
    public decimal PrincipalRealized { get; set; }
    public decimal InterestRealized { get; set; }
    public decimal TotalRealized { get; set; }
    public decimal TotalOverdue { get; set; }
    public decimal PrincipalOutstanding { get; set; }
    public decimal InterestOutstanding { get; set; }
    public decimal TotalOutstanding { get; set; }
    public decimal UnearnedInterestIncome { get; set; }
    public decimal InterestIncomeForThePeriod { get; set; }
    public DateTime LastPaymentDate { get; set; }
}


