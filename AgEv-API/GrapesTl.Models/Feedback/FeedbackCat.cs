using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class FeedbackCategory
{
    public string Id { get; set; }
    public string Category { get; set; }

    [MaxLength(50)]
    [Required]
    public string FeedbackType { get; set; }

}
