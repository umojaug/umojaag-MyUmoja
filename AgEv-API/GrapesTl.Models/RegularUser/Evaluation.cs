using System;

namespace GrapesTl.Models;

public class Evaluation
{
    public string EvaluationId { get; set; }
    public string EvaluationTypeId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string ManagerId { get; set; }
    public DateTime EntryDate { get; set; }
    public string EvaluationTypeName { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string DesignationName { get; set; }
    public string BranchName { get; set; }
    public string ManagerPin { get; set; }
    public string ManagerName { get; set; }
    public DateTime SubmitDate { get; set; }
    public int IsSubmit { get; set; }
    public int IsLock { get; set; }
    public int TotalRating { get; set; }
    public string RejectRemarks { get; set; }

    public string AcceptRemarks { get; set; }
}
