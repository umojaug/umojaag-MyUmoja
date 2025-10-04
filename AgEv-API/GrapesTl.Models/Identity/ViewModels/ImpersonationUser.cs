using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class ImpersonationUser
{

    //[Required]
    //[StringLength(50)]
    //[EmailAddress]
    //public string Email { get; set; }

    [Required]
    public string Id { get; set; }

    //[Required]
    //[StringLength(50, MinimumLength = 5)]
    //public string Password { get; set; }

}
