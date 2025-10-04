using System;

namespace GrapesTl.Models;

public class EmployeeGetById : Employee
{
    public string EmployeePin { get; set; }
    public bool CanEdit { get; set; }
    public string EntryBy { get; set; }
    public string UpdateBy { get; set; }
    public DateTime EntryDate { get; set; }
    public DateTime UpdateDate { get; set; }
}
