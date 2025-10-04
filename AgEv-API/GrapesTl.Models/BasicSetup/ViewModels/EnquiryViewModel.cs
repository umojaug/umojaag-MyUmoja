using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class EnquiryViewModel
{
    public string EnquiryId { get; set; }

    [Required]
    [MaxLength(50)]
    public string FirstName { get; set; }

    [Required]
    [MaxLength(50)]
    public string LastName { get; set; }

    [Required]
    [MaxLength(50)]
    public string Email { get; set; }

    [Required]
    [MaxLength(50)]
    public string Phone { get; set; }

    [Required]
    [MaxLength(500)]
    public string Remarks { get; set; }

    [Required]
    public bool Communication { get; set; }
}
