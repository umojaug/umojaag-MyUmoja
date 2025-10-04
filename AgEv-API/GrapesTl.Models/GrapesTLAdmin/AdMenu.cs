namespace GrapesTl.Models;
public class AdMenu
{
    public int MenuId { get; set; }
    public int ModuleId { get; set; }
    public string MenuName { get; set; }
    public string Link { get; set; }
    public string Icon { get; set; }
    public string IconMobile { get; set; }
    public int Priority { get; set; }

}

public class AdMenuView : AdMenu
{
    public string ModuleName { get; set; }
}