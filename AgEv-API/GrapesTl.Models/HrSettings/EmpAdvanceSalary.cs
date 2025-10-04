using System;

namespace GrapesTl.Models;

public class EmpAdvanceSalary
{
    public int AdvanceId { get; set; }
    public string PinName { get; set; }
    public double AdvanceAmount { get; set; }
    public DateTime NeededAdvanceDate { get; set; }
    public string PurposeOfAdvance { get; set; }
}
