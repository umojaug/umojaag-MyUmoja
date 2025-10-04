using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class TypeOfFraud
{
    public string TypeOfFraudId { get; set; }

    [MaxLength(50)]
    [Required]
    public string TypeOfFraudName { get; set; }

}
