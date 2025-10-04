using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class BuildingViewModel
{
    public string BuildingId { get; set; }

    [MaxLength(100)]
    [Required]
    public string BuildingName { get; set; }

    [MaxLength(255)]
    [Required]
    public string Address { get; set; }
}
