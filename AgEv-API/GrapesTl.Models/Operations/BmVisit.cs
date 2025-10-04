using System;

namespace GrapesTl.Models;

public class BmVisit
{
    public string BmVisitId { get; set; }
    public DateTime VisitDate { get; set; }
    public string BranchId { get; set; }
    public string VisitType { get; set; }
    public string StayOvernight { get; set; }
    public string ManagerId { get; set; }
}
