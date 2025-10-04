using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class IdViewModel
{
    [Required]
    [MaxLength(50)]
    public string Id { get; set; }

}
