using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class ResetPassword
{

    [Required]
    [StringLength(50)]
    public string PhoneNumber { get; set; }

    [Required]
    [StringLength(20)]
    public string OldPassword { get; set; }

    [Required]
    [StringLength(20)]
    public string NewPassword { get; set; }

    [Required]
    [StringLength(20)]
    public string ConfirmPassword { get; set; }
}
