using System;

namespace GrapesTl.Models;

public class BranchVisit
{
    public string BranchVisitId { get; set; }
    public string BranchId { get; set; }
    public string EmployeeId { get; set; }
    public DateTime VisitDate { get; set; }

}

public class BranchVisitView: BranchVisit
{
    public string BranchName { get; set; }
    public string EmployeeName { get; set; }
    public string BranchManager { get; set; }
    public string Status { get; set; }

}

