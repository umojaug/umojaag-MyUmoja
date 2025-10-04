using GrapesTl.Shared.Enums;
using System;

namespace GrapesTl.Dto;
public class VoucherDetailsDto
{
    public string CompanyName { get; set; }
    public string VoucherId { get; set; }
    public int TransId { get; set; }
    public DateTime WorkDate { get; set; }
    public string EntryBy { get; set; }
    public DateTime EntryDate { get; set; }
    public string VoucherNo { get; set; }
    public string OldVoucherNo { get; set; }
    public VoucherType VoucherTypeId { get; set; }
    public string VoucherReference { get; set; }
    public string LedgerId { get; set; }
    public string LedgerCode { get; set; }
    public string LedgerName { get; set; }
    public string AccountName { get; set; }
    public string Particulars { get; set; }
    public double Dr { get; set; }
    public double Cr { get; set; }
    public string BranchName { get; set; }
}