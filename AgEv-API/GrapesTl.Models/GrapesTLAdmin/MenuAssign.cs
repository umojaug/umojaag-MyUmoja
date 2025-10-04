namespace GrapesTl.Models;
public class MenuAssign
{
    public int MenuId { get; set; }
    public string UserId { get; set; }
}

public class MenuAssignView : MenuAssign
{
    public int MenuAssignId { get; set; }
    public string EmployeeName { get; set; }
    public string FullName { get; set; }
    public string ModuleName { get; set; }
    public string MenuName { get; set; }
    public string Link { get; set; }
    public string Icon { get; set; }
    public string IconMobile { get; set; }
}
