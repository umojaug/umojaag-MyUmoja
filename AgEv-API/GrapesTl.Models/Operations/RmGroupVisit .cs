namespace GrapesTl.Models;

public class RmGroupVisit
{
    public long OpsRmGroupvisitId { get; set; }
    public string RmVisitId { get; set; }
    public string LoName { get; set; }
    public string GroupName { get; set; }
    public double TotalBorrower { get; set; }
    public double NumberOfBorrower { get; set; }
    public double PassbookChecked { get; set; }
    public double PassbookMissing { get; set; }
}
