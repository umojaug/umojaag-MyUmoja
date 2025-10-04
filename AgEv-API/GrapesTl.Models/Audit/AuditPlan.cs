using System;

namespace GrapesTl.Models;


public class AuditPlanMaster
{
    public string PlanMasterId { get; set; }
    public string AuditYear { get; set; }
    public string CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public string ApprovedBy { get; set; }
    public DateTime ApprovedDate { get; set; }
    public string Status { get; set; }
}
public class AuditPlanDetails
{
    public long PlanDetailsId { get; set; }
    public string BranchId { get; set; }
    public string Fraud { get; set; }
    public int StaffTurnover { get; set; }
    public int InherentRisk { get; set; }
    public int ResidualRisk { get; set; }
    public string OverallRiskRating { get; set; }
    public string SelectedForAuditPeriod { get; set; }
    public int Budget { get; set; }
    public string BusinessArea { get; set; }
    public string AuditType { get; set; }
    public double PortfolioValue { get; set; }
    public string Par { get; set; }
    public double NumOfBorrower { get; set; }
    public string Weightage { get; set; }
    public object AURef { get; set; }
    public object AUName { get; set; }
}

public class AuditPlanDetailsAdd
{
    public string PlanMasterId { get; set; }
    public string BranchId { get; set; }
    public string Fraud { get; set; }
    public int StaffTurnover { get; set; }
    public int InherentRisk { get; set; }
    public int ResidualRisk { get; set; }
    public string OverallRiskRating { get; set; }
    public string SelectedForAuditPeriod { get; set; }
    public int Budget { get; set; }

}