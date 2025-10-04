using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class ExpenseViewModel
{
    public string ExpenseId { get; set; }

    [MaxLength(100)]
    [Required]
    public string ExpenseName { get; set; }
}
