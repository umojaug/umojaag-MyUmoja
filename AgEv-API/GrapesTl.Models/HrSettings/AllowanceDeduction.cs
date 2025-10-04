using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class AllowanceDeduction
{
    public string AllowanceDeductionId { get; set; }

    [MaxLength(50)]
    [Required]
    public string AllowanceDeductionName { get; set; }

    [Required]
    public string AllowanceDeductionType { get; set; }


}
