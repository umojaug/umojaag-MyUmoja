namespace GrapesTl.Models;

public class AmGroupVisit
{
    public long OpsAmGroupvisitId { get; set; }
    public string AmVisitId { get; set; }
    public string LoName { get; set; }
    public string GroupName { get; set; }
    public double TotalBorrower { get; set; }
    public double NumberOfBorrower { get; set; }
    public double PassbookChecked { get; set; }
    public double PassbookMissing { get; set; }
}
