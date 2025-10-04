using System;

namespace GrapesTl.Models;

public class EmpIncrement
{
    public string PinName { get; set; }
    public double GrossSalaryUsd { get; set; }
    public double GrossSalary { get; set; }
    public DateTime EffectiveDate { get; set; }
    public string Particulars { get; set; }
}
