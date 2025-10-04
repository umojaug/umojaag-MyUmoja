using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class Education
{
    public string EducationId { get; set; }

    [MaxLength(50)]
    [Required]
    public string EducationName { get; set; }

}
