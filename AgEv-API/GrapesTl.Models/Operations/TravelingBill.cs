using System;

namespace GrapesTl.Models;

public class TravelingBill
{

    public string TravelBillId { get; set; }
    public string TravelId { get; set; }
    public DateTime TravelingDate { get; set; }
    public string StartFrom { get; set; }
    public string EndTo { get; set; }
    public double Taxi { get; set; }
    public double Bus { get; set; }
    public double Train { get; set; }
    public double Motorcycle { get; set; }
    public double Others { get; set; }
    public double Total { get; set; }
    public string Remarks { get; set; }
    public string DesignationName { get; set; }
    public string EmployeeName { get; set; }
    public string EmployeePin { get; set; }
    public string ManagerId { get; set; }
    public string ManagerName { get; set; }
    public string CheckerName { get; set; }


}
