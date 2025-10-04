using Microsoft.AspNetCore.Http;

namespace GrapesTl.Models;

public class CvBanK
{
    public string FullName { get; set; }
    public string Email { get; set; }
    public string CompanyId { get; set; }
    public string DepartmentId { get; set; }
    public string JobType { get; set; }
    public IFormFile File { get; set; }

}

public class CvBanKView : CvBanK
{
    public string CvBankId { get; set; }
    public string DepartmentName { get; set; }
    public string CompanyName { get; set; }
    public string FileUrl { get; set; }


}
