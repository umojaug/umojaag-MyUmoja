using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class ChangePassword
{
    [Required]
    public string Password { get; set; }
}
