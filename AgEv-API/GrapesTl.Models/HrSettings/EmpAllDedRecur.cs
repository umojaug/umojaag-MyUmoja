using System;

namespace GrapesTl.Models;

public class EmpAllDedRecur
{
    public string RecurId { get; set; }
    public string PinName { get; set; }
    public string AllowanceDeductionId { get; set; }
    public DateTime EffectiveDate { get; set; }
    public double Amount { get; set; }
    public string Particulars { get; set; }
    public string IsActive { get; set; }
}
