using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class EvaluationType
{
    public string EvaluationTypeId { get; set; }

    [MaxLength(50)]
    [Required]
    public string EvaluationTypeName { get; set; }
    public string Frequency { get; set; }

}
