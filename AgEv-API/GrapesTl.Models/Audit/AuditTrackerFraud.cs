namespace GrapesTl.Models;

public class AuditTrackerFraud
{
    public string ReportDetailsId { get; set; }
    public string Year { get; set; }
    public string ReportingQuarter { get; set; }
    public string MonthOfAudit { get; set; }
    public string DetectionMethod { get; set; }
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
    public string BranchName { get; set; }
    public string RegionName { get; set; }
    public string DepartmentName { get; set; }
    public string TypeOfFraudName { get; set; }
    public string ImplementedName { get; set; }
    public string IaInChargeName { get; set; }
    public string Comments { get; set; }

}



public class AuditTrackerFraudUpdate
{
    public string ReportId { get; set; }
    public string Status { get; set; }
    public string Comments { get; set; }


}