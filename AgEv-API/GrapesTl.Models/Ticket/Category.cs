using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class TicketCategory
{
    public string CategoryId { get; set; }

    [MaxLength(50)]
    [Required]
    public string CategoryName { get; set; }

}
