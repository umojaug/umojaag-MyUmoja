using System;

namespace GrapesTl.Models;

public class AuditTrail
{
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string TaskName { get; set; }
    public string EntryBy { get; set; }
    public DateTime EntryDate { get; set; }
    public DateTime UpdateDate { get; set; }
}
