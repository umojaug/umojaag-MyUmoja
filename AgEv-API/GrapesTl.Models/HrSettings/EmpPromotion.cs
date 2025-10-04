using Microsoft.AspNetCore.Http;
using System;

namespace GrapesTl.Models;

public class EmpPromotion
{
    public string PinName { get; set; }
    public string DesignationId { get; set; }
    public double GrossSalaryUsd { get; set; }
    public double GrossSalary { get; set; }
    public DateTime EffectiveDate { get; set; }
    public string Particulars { get; set; }
    public IFormFile File { get; set; }
}
