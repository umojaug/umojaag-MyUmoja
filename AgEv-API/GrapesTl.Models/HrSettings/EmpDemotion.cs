using Microsoft.AspNetCore.Http;
using System;

namespace GrapesTl.Models;

public class EmpDemotion
{
    public string PinName { get; set; }
    public string DesignationId { get; set; }
    public DateTime EffectiveDate { get; set; }
    public string Particulars { get; set; }
    public IFormFile File { get; set; }
}
