using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class RiskImplication
{
    public string RiskImplicationId { get; set; }

    [MaxLength(50)]
    [Required]
    public string RiskImplicationName { get; set; }

}
