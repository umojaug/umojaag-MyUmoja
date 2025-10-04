using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class InherentRisk
{
    public string InherentRiskId { get; set; }

    [MaxLength(50)]
    [Required]
    public string InherentRiskName { get; set; }

    public int InherentRiskValue { get; set; }

}
