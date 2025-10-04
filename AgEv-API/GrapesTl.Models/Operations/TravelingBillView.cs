using Microsoft.AspNetCore.Http;
using System;

namespace GrapesTl.Models;

public class TravelingBillView
{

    public string EmployeeId { get; set; }
    public DateTime TravelingDate { get; set; }
    public string Remarks { get; set; }
    public string EntryBy { get; set; }
    public string TravelId { get; set; }
    public DateTime EntryDate { get; set; }
    public DateTime SubmitDate { get; set; }
    public int IsSubmit { get; set; }
    public int IsLock { get; set; }
    public string RejectRemarks { get; set; }
    public string AcceptRemarks { get; set; }
    public string SubmitRemarks { get; set; }
    public string DesignationName { get; set; }
    public string EmployeeName { get; set; }
    public string EmployeePin { get; set; }
    public string ManagerId { get; set; }
    public string ManagerName { get; set; }
    public string AllVisitId { get; set; }
    public string CheckedBy { get; set; }
    public string CheckerName { get; set; }
    public string Title { get; set; }
    public string FileUrl { get; set; }
    //public string File { get; set; }

    public IFormFile File { get; set; }
    public string CheckerDesignation { get; set; }
    public string ManagerDesignation { get; set; }
    public int BillStatus { get; set; }




}
