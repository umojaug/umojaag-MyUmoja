namespace GrapesTl.Models;

public class AllObdBorrowerVisit
{

    public string ObdBorrowerId { get; set; }
    public string AllVisitId { get; set; }
    public string TakenAction { get; set; }
    public string BmComments { get; set; }
    public string SupervisorComments { get; set; }
    public int IsSubmit { get; set; }
    public int IsLock { get; set; }

}
