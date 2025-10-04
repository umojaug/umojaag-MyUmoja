using Microsoft.AspNetCore.Http;

namespace GrapesTl.Models;

public class Content
{
    public string ContentId { get; set; }
    public string CourseId { get; set; }
    public string Title { get; set; }
    public IFormFile File { get; set; }
}

public class ContentView : Content
{

    public string FileUrl { get; set; }
}
