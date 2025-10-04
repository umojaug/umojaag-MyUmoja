using System;

namespace GrapesTl.Models;

public class BranchDto
{
    public string BranchId { get; set; }
    public string DivisionName { get; set; }
    public string RegionName { get; set; }
    public string AreaName { get; set; }
    public string BranchName { get; set; }
    public DateTime StartDate { get; set; }
    public string DocUploadMethod { get; set; }
}