using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class Course
{

    public string CourseId { get; set; }

    [Required]
    [MaxLength(50)]
    public string CategoryId { get; set; }

    [MaxLength(50)]
    [Required]
    public string Title { get; set; }

    [MaxLength(100)]
    public string RefLink { get; set; }

    public string ImageUrl { get; set; }
}
