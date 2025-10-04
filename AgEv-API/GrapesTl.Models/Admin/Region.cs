using System;

namespace GrapesTl.Models;

public class Region
{
    public string RegionId { get; set; }
    public string DivisionId { get; set; }
    public string RegionName { get; set; }
    public DateTime StartDate { get; set; }

}

public class RegionView : Region
{
    public string DivisionName { get; set; }
}

public class RegionAssign
{
    public string RegionId { get; set; }
    public string EmployeeId { get; set; }
}

public class RegionAssignView
{
    public string RmAssignId { get; set; }
    public string RegionName { get; set; }
    public string EmployeeId { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
}