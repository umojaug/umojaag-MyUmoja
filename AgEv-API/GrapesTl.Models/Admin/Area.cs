namespace GrapesTl.Models;

public class Area
{
    public string AreaId { get; set; }
    public string RegionId { get; set; }
    public string AreaName { get; set; }

}

public class AreaView : Area
{
    public string DivisionName { get; set; }
    public string RegionName { get; set; }
}

public class AreaAssign
{
    public string AreaId { get; set; }
    public string EmployeeId { get; set; }
}

public class AreaAssignView
{
    public string AmAssignId { get; set; }
    public string RegionName { get; set; }
    public string AreaName { get; set; }
    public string EmployeeId { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
}