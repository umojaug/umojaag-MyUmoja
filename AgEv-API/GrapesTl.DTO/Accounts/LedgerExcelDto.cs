using System;

namespace GrapesTl.Dto;

public class LedgerExcelDto
{
    public string VoucherId { get; set; }
    public string CompanyName { get; set; }
    public DateTime WorkDate { get; set; }
    public string Particulars { get; set; }
    public string AccountName { get; set; }
    public string VoucherNo { get; set; }
    public double Dr { get; set; }
    public double Cr { get; set; }
    public decimal ClosingBalance { get; set; }
}