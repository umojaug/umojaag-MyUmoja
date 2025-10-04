namespace GrapesTl.Models;

public class User
{
    public string Id { get; set; }
    public string BranchName { get; set; }
    public string DepartmentName { get; set; }
    public string DesignationName { get; set; }
    public string EmployeeId { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string UserName { get; set; }
    public string FullName { get; set; }
    public string Role { get; set; }
}


public class LookupBy
{
    public string EmployeePin { get; set; }
}