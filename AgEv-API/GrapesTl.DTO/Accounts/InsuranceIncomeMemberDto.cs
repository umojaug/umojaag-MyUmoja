using System;

namespace GrapesTl.Dto;


public class InsuranceIncomeMemeberDto
{
    public int SL { get; set; }
    public string CompanyName { get; set; }
    public string GroupName { get; set; }
    public string ClientCode { get; set; }
    public string ClientName { get; set; }
    public string LoanNo { get; set; }
    public int Cycle { get; set; }
    public string LoanType { get; set; }
    public string CollectedBy { get; set; }
    public DateTime DisbursementDate { get; set; }
    public decimal DisbursedAmount { get; set; }

    // Opening
    public decimal OpeningUML { get; set; }
    public decimal OpeningUBL { get; set; }
    public decimal OpeningUAL { get; set; }
    public decimal OpeningTotal { get; set; }

    // Deposit
    public decimal DepositeUML { get; set; }
    public decimal DepositeUBL { get; set; }
    public decimal DepositeUAL { get; set; }
    public decimal DepositeTotal { get; set; }

    // Amortized
    public decimal AmortizedUML { get; set; }
    public decimal AmortizedUBL { get; set; }
    public decimal AmortizedUAL { get; set; }
    public decimal AmortizedTotal { get; set; }

    // Death
    public decimal DeathUML { get; set; }
    public decimal DeathUBL { get; set; }
    public decimal DeathUAL { get; set; }
    public decimal DeathTotal { get; set; }

    // Closing
    public decimal ClosingUML { get; set; }
    public decimal ClosingUBL { get; set; }
    public decimal ClosingUAL { get; set; }
    public decimal ClosingTotal { get; set; }
}
