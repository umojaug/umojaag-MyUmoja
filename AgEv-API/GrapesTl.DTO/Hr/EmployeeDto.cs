using System;
namespace GrapesTl.Models;

public class EmployeeDto
{
    public string EmployeeId { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string ContactNumber { get; set; }
    public string Email { get; set; }
    public string BranchId { get; set; }
    public string DepartmentId { get; set; }
    public string DesignationId { get; set; }
    public string StaffTypeId { get; set; }
    public string Gender { get; set; }
    public DateTime JoiningDate { get; set; }
    public string EducationId { get; set; }
}