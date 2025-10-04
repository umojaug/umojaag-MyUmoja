using System;

namespace GrapesTl.Models;

public class CourseReadById
{
    public long ReadId { get; set; }
    public string OfficeName { get; set; }
    public string DepartmentName { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string DesignationName { get; set; }
    public DateTime ReadDateTime { get; set; }

}
