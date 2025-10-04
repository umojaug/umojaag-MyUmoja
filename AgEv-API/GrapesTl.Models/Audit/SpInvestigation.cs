using Microsoft.AspNetCore.Http;

namespace GrapesTl.Models;

public class SpInvestigationBase
{
    public string InvestigationId { get; set; }
    public string Title { get; set; }
    public string InvestigationDate { get; set; }
}


public class SpInvestigation : SpInvestigationBase
{
    public string BranchId { get; set; }
    public string DepartmentId { get; set; }
}

public class SpInvestigationView : SpInvestigationBase
{
    public string BranchName { get; set; }
    public string DepartmentName { get; set; }
    public string Status { get; set; }
}


public class SpInvestigationDetails
{
    public string InvestigationDetailsId { get; set; }
    public string InvestigationId { get; set; }
    public string Guideline { get; set; }
    public string ReportInputs { get; set; }
    public string TestSteps { get; set; }
    public string Evidences1 { get; set; }
    public string Evidences2 { get; set; }
    public string Evidences3 { get; set; }
    public string TestConclusion { get; set; }
    public IFormFile File1 { get; set; }
    public IFormFile File2 { get; set; }
    public IFormFile File3 { get; set; }

}
