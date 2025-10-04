using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class ResignReason
{
    public string ResignReasonId { get; set; }

    [MaxLength(50)]
    [Required]
    public string ResignReasonName { get; set; }
    public string ResignStatus { get; set; }

}
