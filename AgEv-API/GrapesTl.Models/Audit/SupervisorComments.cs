namespace GrapesTl.Models;


public class SupervisorComments
{
    public string NoteId { get; set; }
    public string ReportId { get; set; }
    public string Note { get; set; }
    public string EntryBy { get; set; }
    public string EntryDate { get; set; }

}

public class SupervisorCommentsHeader
{
    public string Header { get; set; }
    public string RegionName { get; set; }
    public string BranchName { get; set; }
    public string DepartmentName { get; set; }
    public string Year { get; set; }
    public string MonthOfAudit { get; set; }
    // public string ReportId { get; set; }


}
