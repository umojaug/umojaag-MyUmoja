namespace GrapesTl.Models;

public class AllDocCheck
{
    public string DocCheckId { get; set; }
    public string AllVisitId { get; set; }
    public string IdentifiedMajor { get; set; }
    public string TakenSteps { get; set; }
    public string BmComments { get; set; }
    public string SupervisorComments { get; set; }
    public int IsSubmit { get; set; }
    public int IsLock { get; set; }
}
