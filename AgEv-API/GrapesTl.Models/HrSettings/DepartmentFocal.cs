
namespace GrapesTl.Models;

public class DepartmentFocal
{
    public string FocalId { get; set; }
    public string DepartmentId { get; set; }
    public string EmployeeId { get; set; }

}

public class DepartmentFocalView : DepartmentFocal
{
    public string DepartmentName { get; set; }
    public string EmployeeName { get; set; }

}
