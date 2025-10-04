using Microsoft.AspNetCore.Http;

namespace GrapesTl.Models;

public class SpecialInvestigationReport
{
    public string ReportId { get; set; }
    public string Year { get; set; }
    public string ReportingQuarter { get; set; }
    public string MonthOfAudit { get; set; }
    public string DepartmentId { get; set; }
    public string BranchId { get; set; }
    public string DetectionMethod { get; set; }
    public string TypeOfFraudId { get; set; }
    public string WhoMightBeInvolved { get; set; }
    public string PositionOfFraudster { get; set; }
    public string LengthOfServiceOfFraudster { get; set; }
    public string HowIsTheFraudBeingPerpetrated { get; set; }
    public string NumberOfOccurences { get; set; }
    public string PotentialWitness { get; set; }
    public string Observations { get; set; }
    public string DefectiveControlsIdentified { get; set; }
    public string EstimatedFraudLoss { get; set; }
    public string AmountRecovered { get; set; }
    public string Recommendations { get; set; }
    public string ManagementResponse { get; set; }
    public string ImplementedBy { get; set; }
    public string IAInCharge { get; set; }
    public string Status { get; set; }
    public string CurrentStatusUpdate { get; set; }
    public string ReportType { get; set; }
    public string DocumentReview1 { get; set; }
    public string DocumentReview2 { get; set; }
    public string DocumentReview3 { get; set; }
    public string DocumentReview4 { get; set; }
    public IFormFile File1 { get; set; }
    public IFormFile File2 { get; set; }
    public IFormFile File3 { get; set; }
    public IFormFile File4 { get; set; }
    public IFormFile File5 { get; set; }
    public IFormFile File6 { get; set; }

}

public class SpecialInvestigationReportView : SpecialInvestigationReport
{
    public string BranchName { get; set; }
    public string RegionName { get; set; }
    public string TypeOfFraudName { get; set; }
    public string DepartmentName { get; set; }
    public string ImplementedByName { get; set; }
    public string IaInChargeName { get; set; }
    public string Statements { get; set; }
    public string Evidence1 { get; set; }
    public string Evidence2 { get; set; }
    public string Evidence3 { get; set; }
    public string Evidence4 { get; set; }
    public string Evidence5 { get; set; }
    public string Evidence6 { get; set; }
    public string Comments { get; set; }
    public long IsComment { get; set; }

}
