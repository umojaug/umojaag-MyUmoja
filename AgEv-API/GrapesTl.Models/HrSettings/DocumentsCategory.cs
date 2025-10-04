using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class DocumentsCategory
{
    public string CategoryId { get; set; }

    [MaxLength(50)]
    [Required]
    public string CategoryName { get; set; }

}
