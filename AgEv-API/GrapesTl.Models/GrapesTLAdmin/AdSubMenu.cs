namespace GrapesTl.Models;
public class AdSubMenu
{
    public int SubMenuId { get; set; }
    public int MenuId { get; set; }
    public string SubMenuName { get; set; }
    public string Link { get; set; }
    public string Icon { get; set; }
    public string IconMobile { get; set; }
    public int Priority { get; set; }
    public string Section { get; set; }

}

public class AdSubMenuView : AdSubMenu
{
    public string MenuName { get; set; }
    public string ModuleName { get; set; }

}
