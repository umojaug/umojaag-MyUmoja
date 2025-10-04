using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class ForgetPassword
{

    //[Required]
    //[StringLength(50)]
    //[EmailAddress]
    //public string Email { get; set; }

    [Required]
    [StringLength(50)]
    public string PhoneNumber { get; set; }

}
