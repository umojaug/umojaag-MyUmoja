using Microsoft.AspNetCore.Http;

namespace GrapesTl.Models;

public class Archive
{
    public string ArchiveId { get; set; }
    public string EmployeeId { get; set; }
    public string Title { get; set; }
    public IFormFile File { get; set; }
}

public class ArchiveView : Archive
{
    public string FileUrl { get; set; }

}
