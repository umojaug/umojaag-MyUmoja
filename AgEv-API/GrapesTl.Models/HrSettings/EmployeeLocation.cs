using System;

namespace GrapesTl.Models;

public class EmployeeLocation
{
    public string Longitude { get; set; }
    public string Latitude { get; set; }
    public string LocationName { get; set; }
    public DateTime Date { get; set; }
}

public class EmployeeLocationView: EmployeeLocation
{
    public string EmployeeName { get; set; }
    public string EmployeePin { get; set; }
   
}