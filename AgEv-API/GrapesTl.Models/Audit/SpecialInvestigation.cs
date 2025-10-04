using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class SpecialInvestigation
{
    public string SpecialInvestigationId { get; set; }

    [MaxLength(50)]
    [Required]
    public string Guideline { get; set; }

    public string TestSteps { get; set; }

}
