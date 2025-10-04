using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class LoginUser
{

    //[Required]
    //[StringLength(50)]
    //[EmailAddress]
    //public string Email { get; set; }

    [Required]
    [StringLength(50)]
    public string PhoneNumber { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 8)]
    public string Password { get; set; }

}
