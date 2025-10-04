using GrapesTl.Models;
using System;
using System.Collections.Generic;

namespace GrapesTl.Dto;

public class AuthResponse
{
    public string AccessToken { get; set; }
    public bool IsSuccess { get; set; }
    public IEnumerable<string> Errors { get; set; }
    public DateTime ExpireDate { get; set; }
    public string Message { get; set; }
    public string Role { get; set; }
    public string RefreshToken { get; set; }
    public IEnumerable<AdModule> Modules { get; set; }
    public IEnumerable<AdMenuDto> Menus { get; set; }
    public IEnumerable<AdSubMenuDto> SubMenus { get; set; }
    public Company Company { get; set; }
}
