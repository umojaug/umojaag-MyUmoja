using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;


public class RegisterRole
{

    [Required]
    public string RoleName { get; set; }
}

public class RegisterRoleView : RegisterRole
{
    [Required]
    public string Id { get; set; }
}
