using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class Feedback
{
    [MaxLength(50)]
    [Required]
    public string FeedbackType { get; set; }

    [MaxLength(50)]
    [Required]
    public string DepartmentId { get; set; }

    [MaxLength(4000)]
    [Required]
    public string Particulars { get; set; }
    public string AllowAnonymous { get; set; }
    public string Category { get; set; }
    public string Status { get; set; }
}
