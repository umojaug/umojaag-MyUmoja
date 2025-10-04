namespace GrapesTl.Models;

public class RoleAccessView
{
    public int Id { get; set; }
    public int AdMenuAssignRoleId { get; set; }
    public string Role { get; set; }
    public string ModuleName { get; set; }
    public string MenuName { get; set; }
    public int AdSubMenuAssignRoleId { get; set; }
    public string SubMenuName { get; set; }

}

