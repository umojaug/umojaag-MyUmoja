using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class Department
{
    public string DepartmentId { get; set; }

    [MaxLength(50)]
    [Required]
    public string DepartmentName { get; set; }

}
