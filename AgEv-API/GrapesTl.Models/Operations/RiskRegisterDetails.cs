using Microsoft.AspNetCore.Http;
using System;

namespace GrapesTl.Models;

public class RiskRegisterDetailsView
{
    public string RiskCode { get; set; }
    public string RiskRegisterDetailsId { get; set; }
    public string PrincipleRisks { get; set; }
    public string SpecificRisk { get; set; }
    public string RiskIndicator { get; set; }
    public string IndicatorType { get; set; }
    public string UmojaRiskAppetite { get; set; }
    public string RiskOwner { get; set; }
    public string AssignedRiskOwner { get; set; }
    public string LikelihoodRating { get; set; }
    public string ConsequenceRating { get; set; }
    public string OverallRating { get; set; }
    public string RiskRatingLevel { get; set; }
    public string Attachment { get; set; }
    public string Comment { get; set; }
    public string MitigationPlan { get; set; }
    public DateTime Timeline { get; set; }
    public string RiskOfficer { get; set; }
    public string RiskParameterCheck { get; set; }
}


public class RiskRegisterDetailsUpdate
{

    public string RiskRegisterDetailsId { get; set; }
    public string LikelihoodRating { get; set; }
    public string ConsequenceRating { get; set; }
    public string OverallRating { get; set; }
    public string RiskRatingLevel { get; set; }
    public IFormFile File { get; set; }
    public string Comment { get; set; }
    public string MitigationPlan { get; set; }
    public DateTime Timeline { get; set; }
    public string RiskOfficer { get; set; }
    public string RiskParameterCheck { get; set; }
}


//public class RiskRegisterSubmitted
//{

//    public string RiskRegisterId { get; set; }
   
//}