using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GrapesTl.Models;

public class ApplicationUser : IdentityUser
{
    [Required]
    [Column(TypeName = "datetime")]
    [DataType(DataType.DateTime)]
    public DateTime CreatedDate { get; set; }

    [Required]
    [MaxLength(150)]
    public string FullName { get; set; }

    [MaxLength(100)]
    [DefaultValue("")]
    public string ImageName { get; set; }

    [MaxLength(50)]
    public string Role { get; set; }

    [MaxLength(50)]
    public string EmployeeId { get; set; }

    public DateTime LastPasswordChangedDate { get; set; }
}
