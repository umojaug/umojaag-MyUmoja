using System;

namespace GrapesTl.Dto;

public class LedgerDto
{
    public string LedgerId { get; set; }
    public string SubGroupId { get; set; }
    public string LedgerName { get; set; }
    public string DisplayAt { get; set; }
    public string VoucherType { get; set; }
    public string AccountType { get; set; }
    public string BranchId { get; set; }
    public string ClassificationName { get; set; }
    public string MainName { get; set; }
    public string GroupName { get; set; }
    public string SubGroupName { get; set; }
    public string LedgerCode { get; set; }
    public string BranchName { get; set; }
    public string CompanyName { get; set; }
    public DateTime WorkDate { get; set; }
    public string Particulars { get; set; }
    public string VoucherNo { get; set; }
    public decimal Dr { get; set; }
    public decimal Cr { get; set; }
    public decimal ClosingBalance { get; set; }
}