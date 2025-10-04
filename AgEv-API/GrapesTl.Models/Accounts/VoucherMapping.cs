using System;
namespace GrapesTl.Models;

public class VoucherMapping
{
    public string VoucherMappingId { get; set; }
    public string TransactionType { get; set; }
    public string LoanProductId { get; set; }
    public string ProductName { get; set; }
    public string Type { get; set; }
    public string LedgerId { get; set; }
}

public class VoucherMappingView : VoucherMapping
{
    public DateTime WorkDate { get; set; }
    public string FullName { get; set; }
    public string LedgerName { get; set; }

}

public class TransactionType
{
    public string TransactionTypeId { get; set; }
    public string TransactionName { get; set; }

}