namespace GrapesTl.Models;

public class BmCashAtHand
{
    public long OpsBmCashAtHandId { get; set; }
    public string BmVisitId { get; set; }
    public double OpeningBalance { get; set; }
    public double ClosingBalance { get; set; }
    public string AboveCeilingReason { get; set; }
}
