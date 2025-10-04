using System;
using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class Shift
{
    public string ShiftId { get; set; }

    [MaxLength(50)]
    [Required]
    public string ShiftName { get; set; }

    public DateTime ShiftIn { get; set; }
    public DateTime ShiftOut { get; set; }
    public DateTime ShiftAbsent { get; set; }
    public DateTime ShiftLate { get; set; }
    public DateTime ShiftEarly { get; set; }
    public DateTime ShiftLunchFrom { get; set; }
    public DateTime ShiftLunchTill { get; set; }
    public DateTime ShiftLastPunch { get; set; }
    public Boolean DefaultShift { get; set; }

}
