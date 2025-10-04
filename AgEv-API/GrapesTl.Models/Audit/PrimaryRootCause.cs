using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class PrimaryRootCause
{
    public string PrimaryRootCauseId { get; set; }

    [MaxLength(50)]
    [Required]
    public string PrimaryRootCauseName { get; set; }

}
