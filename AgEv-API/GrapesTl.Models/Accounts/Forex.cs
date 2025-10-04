using System;
using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class Forex
{
    public string ForexId { get; set; }

    [MaxLength(50)]
    [Required]
    public string ForexName { get; set; }
    [Required]
    public double ForexRate { get; set; }
    [Required]
    public DateTime WorkDate { get; set; }

}
