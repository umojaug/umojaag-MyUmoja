namespace GrapesTl.Models;

public class Job
{
    public string JobId { get; set; }
    public string DepartmentId { get; set; }
    public string CompanyId { get; set; }
    public string Title { get; set; }
    public string Section { get; set; }
}
public class JobView : Job
{
    public string DepartmentName { get; set; }
    public string CompanyName { get; set; }
    public string JobStatus { get; set; }


}
