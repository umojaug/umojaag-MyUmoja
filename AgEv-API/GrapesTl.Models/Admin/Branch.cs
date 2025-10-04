using System;

namespace GrapesTl.Models;

public class Branch
{
    public string BranchId { get; set; }
    public string AreaId { get; set; }
    public string BranchName { get; set; }
    public DateTime StartDate { get; set; }

}

public class BranchView : Branch
{
    public string DivisionName { get; set; }
    public string RegionName { get; set; }
    public string AreaName { get; set; }
}

public class BranchAssign
{
    public string BranchId { get; set; }
    public string EmployeeId { get; set; }
}

public class BranchAssignView
{
    public string BmAssignId { get; set; }
    public string RegionName { get; set; }
    public string AreaName { get; set; }
    public string BranchName { get; set; }
    public string EmployeeId { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
}