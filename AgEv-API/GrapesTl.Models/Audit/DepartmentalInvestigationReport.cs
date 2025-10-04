using Microsoft.AspNetCore.Http;
using System;

namespace GrapesTl.Models;

public class DepartmentalInvestigationReportBase
{
    public string DpInvestigationId { get; set; }
    public string Title { get; set; }
    public string TestSteps { get; set; }
    public string InvestigationDate { get; set; }
}


public class DepartmentalInvestigationReport : DepartmentalInvestigationReportBase
{
    public string BranchId { get; set; }
    public string DepartmentId { get; set; }
    //public string TestSteps { get; set; }

}

public class DepartmentalInvestigationReportView : DepartmentalInvestigationReportBase
{
    public string BranchName { get; set; }
    public string DepartmentName { get; set; }
    public string Status { get; set; }

}


public class DepartmentalInvestigationReportDetails
{
    public string InvestigationDetailsId { get; set; }
    public DateTime TestingDate { get; set; }
    public string SampledMonth { get; set; }
    public string AuditPeriod { get; set; }
    public string SampleSelectionMethod { get; set; }
    public string ControlFrequency { get; set; }
    public string PopulationSize { get; set; }
    public string SampleSize { get; set; }
    public string TestConclusion { get; set; }
    public string AuditFinding { get; set; }
    public IFormFile File { get; set; }

}

public class DepartmentalInvestigationReportDetailsView : DepartmentalInvestigationReportDetails
{
    public string DpInvestigationId { get; set; }
    public string TestArea { get; set; }
    public string TestSteps { get; set; }
    public string DepartmentName { get; set; }
    public string Evidences { get; set; }

}
