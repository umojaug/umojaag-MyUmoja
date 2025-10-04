
using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class ResidualRisk
{

    public string ResidualRiskId { get; set; }

    [MaxLength(50)]
    [Required]
    public string ResidualRiskName { get; set; }

    public int ResidualRiskValue { get; set; }
}
