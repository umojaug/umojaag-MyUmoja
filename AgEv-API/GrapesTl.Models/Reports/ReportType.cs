using System;
using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class ReportParams
{
    [Required]
    public string ReportKey { get; set; }
    public string ReportType { get; set; } // Branch Wise or Member Wise or    
    public string ReportFormat { get; set; }
    public string BranchIds { get; set; }
    public string BranchArea { get; set; }
    public string ProductIds { get; set; }
    public string LedgerId { get; set; }
    public DateTime FromDate { get; set; }
    public DateTime TillDate { get; set; }
    public string DisplayAt { get; set; }
    public string FromMonth { get; set; }
    public string FromYear { get; set; }
    public string TillMonth { get; set; }
    public string TillYear { get; set; }
    public string Month { get; set; }
    public string Year { get; set; }
    public string SchemeIds { get; set; }
    public string AreaIds { get; set; }
    public string UserId { get; set; }
    public string VoucherId { get; set; }
    public string VoucherNo { get; set; }
}
