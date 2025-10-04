namespace GrapesTl.Models;

public class AllVerifyLoanApplication
{

    public long VerificationId { get; set; }
    public string AllVisitId { get; set; }
    public string WorkToBeDone { get; set; }
    public string Status { get; set; }
    public int Number { get; set; }
    public string Findings { get; set; }
    public string TakenSteps { get; set; }
    public string BmComments { get; set; }
    public string SupervisorComments { get; set; }
    public int IsSubmit { get; set; }
    public int IsLock { get; set; }

}
