namespace GrapesTl.Models;

public class RmBranchPerformance
{
    public long OpsRmBranchPerformanceId { get; set; }
    public string RmVisitId { get; set; }
    public string LoName { get; set; }
    public double NumberOfGroup { get; set; }
    public double OverdueNumber { get; set; }
    public double OverdueAmount { get; set; }
    public double NumberOfBorrower { get; set; }
    public double NumberOfAdmission { get; set; }
    public double SecurityReturn { get; set; }
    public string Remarks { get; set; }

    //public double PassbookChecked { get; set; }
    //public double PassbookMissing { get; set; }
}
