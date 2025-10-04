using Microsoft.AspNetCore.Http;

namespace GrapesTl.Models;

public class AllFeedback
{
    public long AllFeedbackId { get; set; }
    public string AllVisitId { get; set; }
    public string DiscussedIssues { get; set; }
    public string GivenFeedback { get; set; }
    public string Remarks { get; set; }
    public string NameOfAttendees { get; set; }
    public IFormFile File { get; set; }

}
public class AllFeedbackView : AllFeedback
{
    public string ImageUrl { get; set; }

}
