using Microsoft.AspNetCore.Http;
using System;

namespace GrapesTl.Models;

public class AuditRegionReportDetails
{
    public string ReportDetailsId { get; set; }
    public string AreaOfReviewId { get; set; }
    public string DetailedAuditFinding { get; set; }
    public string PrimaryRootCauseId { get; set; }
    public string RiskImplicationId { get; set; }
    public string Recommendations { get; set; }
    public string ImplementedBy { get; set; }
    public string RiskCategory { get; set; }
    public string RegionResponse { get; set; }
    public string ManagementResponse { get; set; }
    public DateTime CommitmentDate { get; set; }
    public string OverallControlsAssessment { get; set; }
    public string FraudRisk { get; set; }
    public string RepeatFinding { get; set; }
    public string FollowUpCommentIfAny { get; set; }
    public IFormFile File { get; set; }
}

public class AuditRegionReportDetailsView : AuditRegionReportDetails
{
    public string ReportId { get; set; }
    public string Year { get; set; }
    public string ReportingQuarter { get; set; }
    public string MonthOfAudit { get; set; }
    public string DepartmentName { get; set; }
    public string RegionId { get; set; }
    public string RegionName { get; set; }
    public string RegionOverview { get; set; }
    public string AreaOfReviewName { get; set; }
    public string PrimaryRootCauseName { get; set; }
    public string RiskImplicationName { get; set; }
    public string ImplementedByName { get; set; }
    public string Appendicies { get; set; }
    public string TestStepsName { get; set; }
    public string InChargeName { get; set; }
    public long IsComment { get; set; }


}

