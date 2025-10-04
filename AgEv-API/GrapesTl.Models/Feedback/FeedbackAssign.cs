namespace GrapesTl.Models;

public class FeedbackAssign
{
    public string AssignId { get; set; }
    public string NoteId { get; set; }
    public string PinName { get; set; }

}

public class FeedbackAssignView : FeedbackAssign
{
    public string EmployeeName { get; set; }


}
