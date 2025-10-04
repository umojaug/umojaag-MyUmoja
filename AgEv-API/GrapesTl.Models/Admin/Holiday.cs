using System;
using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class Holiday
{
    public string HolidayId { get; set; }

    [MaxLength(50)]
    [Required]
    public string HolidayName { get; set; }
    [Required]
    public DateTime FromDate { get; set; }
    [Required]
    public DateTime TillDate { get; set; }

}
