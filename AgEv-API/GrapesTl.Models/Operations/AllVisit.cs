using System;

namespace GrapesTl.Models;

public class AllVisit
{
    public string AllVisitId { get; set; }
    public DateTime VisitDate { get; set; }
    public DateTime VisitEndDate { get; set; }
    public DateTime EntryTime { get; set; }
    public DateTime ExitTime { get; set; }
    public string BranchId { get; set; }
    public string VisitType { get; set; }
    public string StayOvernight { get; set; }
    public string PinName { get; set; }
    public string ManagerPin { get; set; }

}


public class CTLComments
{
    public string AllVisitId { get; set; }
    public string CtlComments { get; set; }
  

}


