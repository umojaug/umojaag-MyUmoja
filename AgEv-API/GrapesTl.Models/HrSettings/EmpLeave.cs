using Microsoft.AspNetCore.Http;
using System;

namespace GrapesTl.Models;

public class EmpLeave
{
    public string PinName { get; set; }
    public string LeaveId { get; set; }
    public DateTime FromDate { get; set; }
    public DateTime TillDate { get; set; }
    public string Particulars { get; set; }
    public IFormFile File { get; set; }
}
