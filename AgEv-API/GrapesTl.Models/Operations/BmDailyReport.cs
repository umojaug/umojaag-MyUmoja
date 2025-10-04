namespace GrapesTl.Models;

public class BmDailyReport
{
    public long OpsBmDailyReportId { get; set; }
    public string BmVisitId { get; set; }
    public double AdmissionNumber { get; set; }
    public double DisbursementNumber { get; set; }
    public double DisbursementAmount { get; set; }
    public double SecurityNumber { get; set; }
    public double SecurityAmount { get; set; }
    public double OverdueNumber { get; set; }
    public double OverdueAmount { get; set; }
    public double BorrowerPositionNumber { get; set; }
    public double BorrowerPositionAmount { get; set; }

}
