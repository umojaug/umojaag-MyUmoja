namespace GrapesTl.Models;

public class Employee : EmployeeCommon
{
    public double BasicSalary { get; set; }
    public double HousingAllowance { get; set; }
    public double TransportAllowance { get; set; }
    public double LunchAllowance { get; set; }
    public double Gratuity { get; set; }
    public string Nhima { get; set; }
    public string Nrc { get; set; }
    public string NidNumber { get; set; }
}

public class EmployeeDetails
{
    public string EmployeeId { get; set; }
    public string ContactNumber { get; set; }
    public string Email { get; set; }
    public string ContactAddress { get; set; }
    public string MaritalStatus { get; set; }
    public string EducationId { get; set; }
    public string KinName { get; set; }
    public string KinAddress { get; set; }
    public string KinContactNumber { get; set; }
    public string KinRelationship { get; set; }
    public string KinEmail { get; set; }
}