using System;

namespace GrapesTl.Models;

public class TopicReadById
{
    public long ReadId { get; set; }
    public string BranchName { get; set; }
    public string DepartmentName { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string DesignationName { get; set; }
    public DateTime ReadDateTime { get; set; }

}
