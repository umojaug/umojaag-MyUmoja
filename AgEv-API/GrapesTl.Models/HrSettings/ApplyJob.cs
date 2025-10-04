using Microsoft.AspNetCore.Http;
namespace GrapesTl.Models;

public class ApplyJob
{

    public string JobId { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public IFormFile File { get; set; }

}

public class ApplyJobView : ApplyJob
{

    public string FileUrl { get; set; }
    public string Title { get; set; }
    public string CompanyName { get; set; }
    public string DepartmentName { get; set; }
    public string JobApplyId { get; set; }
}

public class ApplyJobFeedback
{
    public string JobApplyId { get; set; }
    public string Feedback { get; set; }
    public string Email { get; set; }
}
