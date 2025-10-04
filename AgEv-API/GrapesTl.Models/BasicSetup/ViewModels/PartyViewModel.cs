using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class PartyViewModel
{
    public string PartyId { get; set; }

    [MaxLength(100)]
    [Required]
    public string PartyName { get; set; }

    [MaxLength(50)]
    [Required]
    public string Email { get; set; }

    [MaxLength(50)]
    [Required]
    public string ContactNumber { get; set; }

    [MaxLength(255)]
    [Required]
    public string Address { get; set; }
}
