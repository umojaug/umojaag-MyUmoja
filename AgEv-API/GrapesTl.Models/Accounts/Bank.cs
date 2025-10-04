using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class Bank
{
    public string BankId { get; set; }

    [MaxLength(50)]
    [Required]
    public string BankName { get; set; }

}
