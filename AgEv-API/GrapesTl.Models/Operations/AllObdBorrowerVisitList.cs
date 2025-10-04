namespace GrapesTl.Models;

public class AllObdBorrowerVisitList
{
    public double ObdBorrowerId { get; set; }
    public string AllVisitId { get; set; }
    public string GroupName { get; set; }
    public string BorrowerName { get; set; }
    public double OverdueAmount { get; set; }
    public double LoanBalance { get; set; }
    public double CollectedAmount { get; set; }
    public string TakenAction { get; set; }
    public string bmComments { get; set; }
    public string supervisorComments { get; set; }
    public int IsSubmit { get; set; }

}
