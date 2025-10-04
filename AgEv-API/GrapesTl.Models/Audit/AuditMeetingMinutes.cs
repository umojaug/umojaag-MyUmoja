using Microsoft.AspNetCore.Http;

namespace GrapesTl.Models;

public class AuditMeetingMinutes
{
    public double MeetingMinutesId { get; set; }
    public string AuditYearId { get; set; }
    public string AuditYear { get; set; }
    public string ExcutionId { get; set; }
    public string Particulars { get; set; }
    public IFormFile File { get; set; }

}


public class AuditMeetingMinutesView : AuditMeetingMinutes
{
    public string FileUrl { get; set; }

}