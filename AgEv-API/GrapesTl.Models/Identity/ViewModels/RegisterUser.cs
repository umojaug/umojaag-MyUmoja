using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class RegisterUser
{

    [Required]
    public string FullName { get; set; }

    [Required]
    [MaxLength(50)]
    public string PhoneNumber { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 8)]
    public string Password { get; set; }

    [MaxLength(50)]
    public string EmployeeId { get; set; }

    public string ImageUrl { get; set; }

    public string Email { get; set; }
    public string Role { get; set; }

}
