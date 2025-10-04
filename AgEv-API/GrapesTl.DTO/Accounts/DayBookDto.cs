using System;

namespace GrapesTl.Dto;

public class DayBookDto
{
    public string VoucherId { get; set; }
    public string CompanyName { get; set; }
    public DateTime WorkDate { get; set; }
    public string VoucherNo { get; set; }
    public string VoucherReference { get; set; }
    public string AccountName { get; set; }
    public string Particulars { get; set; }
    public double Dr { get; set; }
    public double Cr { get; set; }

}