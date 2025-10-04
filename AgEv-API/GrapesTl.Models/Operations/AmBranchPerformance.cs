namespace GrapesTl.Models;

public class AmBranchPerformance
{
    public long OpsAmBranchPerformanceId { get; set; }
    public string AmVisitId { get; set; }
    public string LoName { get; set; }
    public double NumberOfGroup { get; set; }
    public double OverdueNumber { get; set; }
    public double OverdueAmount { get; set; }
    public double NumberOfBorrower { get; set; }
    public double NumberOfAdmission { get; set; }
    public double SecurityReturn { get; set; }
    public string Remarks { get; set; }
}
