namespace GrapesTl.Models;

public class RmCashAtHand
{
    public long OpsRmCashAtHandId { get; set; }
    public string RmVisitId { get; set; }
    public double CashbookAmount { get; set; }
    public double PhysicalAmount { get; set; }
    public string Remarks { get; set; }

}
