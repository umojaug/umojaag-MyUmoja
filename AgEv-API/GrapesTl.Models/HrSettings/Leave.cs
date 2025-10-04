using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class Leave
{
    public string LeaveId { get; set; }

    [MaxLength(50)]
    [Required]
    public string LeaveName { get; set; }
    [Required]
    public string ShortCode { get; set; }
    [Required]
    public int YearlyLeave { get; set; }

}
