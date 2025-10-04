using Microsoft.AspNetCore.Http;

namespace GrapesTl.Models;

public class VisitDetails
{
    public long DetailsId { get; set; }
    public string Question { get; set; }
    public string Remarks { get; set; }
    public string AnswerShort { get; set; }
    public string AnswerLong { get; set; }
    public IFormFile File { get; set; }
}

public class VisitDetailsView : VisitDetails
{
    public string FileUrl { get; set; }
}

public class VisitDetailsView1
{
    public VisitDetails[] Data { get; set; }
}
