using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class StaffType
{
    public string StaffTypeId { get; set; }

    [MaxLength(50)]
    [Required]
    public string StaffTypeName { get; set; }

}
