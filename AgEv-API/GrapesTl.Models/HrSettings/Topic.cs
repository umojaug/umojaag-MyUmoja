using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class Topic
{
    public string TopicId { get; set; }

    [Required]
    [MaxLength(50)]
    public string CategoryId { get; set; }

    [MaxLength(100)]
    [Required]
    public string Title { get; set; }

    [MaxLength(100)]
    public string RefLink { get; set; }
}
