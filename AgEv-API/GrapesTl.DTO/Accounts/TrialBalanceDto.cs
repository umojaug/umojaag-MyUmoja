namespace GrapesTl.Dto;

public class TrialBalanceDto
{
    public string VoucherId { get; set; }
    public string CompanyName { get; set; }
    public string LedgerCode { get; set; }
    public string LedgerName { get; set; }
    public decimal OpeningBalance { get; set; }
    public double Dr { get; set; }
    public double Cr { get; set; }
    public decimal ClosingBalance { get; set; }

}