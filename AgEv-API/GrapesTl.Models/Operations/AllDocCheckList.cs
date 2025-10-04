namespace GrapesTl.Models;

public class AllDocCheckList
{
    public long DocCheckId { get; set; }
    public string AllVisitId { get; set; }
    public string WorkToBeDone { get; set; }
    public string Status { get; set; }
    public string IdentifiedMajor { get; set; }
    public string TakenSteps { get; set; }
    public string SupervisorComments { get; set; }
    public string BmComments { get; set; }
    public int IsSubmit { get; set; }

}

