using System;

namespace GrapesTl.Models;

public class EvaluationSummary
{

    public string EvaluationId { get; set; }
    public string BranchName { get; set; }
    public string EmployeeId { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string DesignationName { get; set; }
    public DateTime JoiningDate { get; set; }
    public string SubmitStatus { get; set; }
    public int TotalRating { get; set; }
}
