using GrapesTl.Models;
using System.Collections.Generic;

namespace GrapesTl.Dto;
public class ReloadRoleDto
{
    public IEnumerable<AdModule> Modules { get; set; }
    public IEnumerable<AdMenuDto> Menus { get; set; }
    public IEnumerable<AdSubMenuDto> SubMenus { get; set; }
}
