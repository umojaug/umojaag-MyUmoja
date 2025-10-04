namespace GrapesTl.Models;
public class SubMenuAssign
{
    public int SubMenuId { get; set; }
    public string UserId { get; set; }
}

public class SubMenuAssignView : SubMenuAssign
{
    public int SubMenuAssignId { get; set; }
    public string EmployeeName { get; set; }
    public string FullName { get; set; }
    public string ModuleName { get; set; }
    public string MenuName { get; set; }
    public string SubMenuName { get; set; }
    public string Link { get; set; }
    public string Icon { get; set; }
    public string IconMobile { get; set; }
    public string Section { get; set; }
}

//public class ModuleMenuSubmenuDto
//{
//    public int ModuleId { get; set; }
//    public string ModuleName { get; set; }
//    public string Link { get; set; }
//    public string Icon { get; set; }
//    public string IconMobile { get; set; }
//    public int Priority { get; set; }
//    public List<MenuDto> Menus { get; set; }
//}


//public class MenuDto
//{
//    public int MenuId { get; set; }
//    public string MenuName { get; set; }
//    public string Link { get; set; }
//    public string Icon { get; set; }
//    public string IconMobile { get; set; }
//    public int Priority { get; set; }
//    public List<AdSubMenuView> Submenus { get; set; }
//}