using System;

namespace GrapesTl.Models;
public class MemberAdmissionReportView
{
    public int SL { get; set; }
    public string BranchName { get; set; }
    public string LoanOfficerName { get; set; }
    public string GroupName { get; set; }
    public string MemberCode { get; set; }
    public string MemberName { get; set; }
    public string NID { get; set; }
    public string PhoneNo { get; set; }
    public DateTime AdmissionDate { get; set; }
    public string VoucherNos { get; set; }
    public decimal AdmissionFee { get; set; }
    public decimal PassbookFee { get; set; }
    public string ProductName { get; set; }
    public string MemberType { get; set; }
}

public class MemberAdmissionBranchReportView
{
    public int SL { get; set; }
    public string BranchName { get; set; }
    public decimal TotalAdmissionFeeUML { get; set; }
    public decimal TotalAdmissionFeeUBL { get; set; }
    public decimal TotalPassbookSaleUML { get; set; }
    public decimal TotalPassbookSaleUBL { get; set; }
    public int TotalNoOfAdmissionUML { get; set; }
    public int TotalNoOfAdmissionUBL { get; set; }
    public decimal NewPassbookSaleUML { get; set; }
    public decimal NewPassbookSaleUBL { get; set; }
    public int TotalNoOfNewPassbookSaleUML { get; set; }
    public int TotalNoOfNewPassbookSaleUBL { get; set; }
}
