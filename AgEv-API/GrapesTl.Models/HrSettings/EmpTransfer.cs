using Microsoft.AspNetCore.Http;
using System;

namespace GrapesTl.Models;

public class EmpTransfer
{
    public string PinName { get; set; }
    public string BranchId { get; set; }
    public string DepartmentId { get; set; }
    public string StaffTypeId { get; set; }
    public DateTime EffectiveDate { get; set; }
    public string Particulars { get; set; }
    public IFormFile File { get; set; }
}
