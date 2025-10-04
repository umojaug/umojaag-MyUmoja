using System;

namespace GrapesTl.Models;

public class EvaluationInfo
{
    public string EvaluationId { get; set; }
    public string EvaluationTypeName { get; set; }
    public string Frequency { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string ManagerName { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
    public string DesignationName { get; set; }
    public int TotalRating { get; set; }
    public int IsSubmit { get; set; }
    public int IsLock { get; set; }
    public int IsLeadership { get; set; }
    public string EvaObjectivesId { get; set; }
    public string ObjectiveDetailsOne { get; set; }
    public string EmployeeCommentOne { get; set; }
    public string ManagerCommentOne { get; set; }
    public int RatingOne { get; set; }
    public string ObjectiveDetailsTwo { get; set; }
    public string EmployeeCommentTwo { get; set; }
    public string ManagerCommentTwo { get; set; }
    public int RatingTwo { get; set; }
    public string ObjectiveDetailsThree { get; set; }
    public string EmployeeCommentThree { get; set; }
    public string ManagerCommentThree { get; set; }
    public int RatingThree { get; set; }
    public string ObjectiveDetailsFour { get; set; }
    public string EmployeeCommentFour { get; set; }
    public string ManagerCommentFour { get; set; }
    public int RatingFour { get; set; }
    public string EvaBehaviorsId { get; set; }
    public string AmbitiousAnswer1 { get; set; }
    public string AmbitiousAnswer2 { get; set; }
    public string AmbitiousReply { get; set; }
    public int AmbitiousRating { get; set; }
    public string ConsistentAnswer1 { get; set; }
    public string ConsistentAnswer2 { get; set; }
    public string ConsistentReply { get; set; }
    public int ConsistentRating { get; set; }
    public string PositiveAnswer1 { get; set; }
    public string PositiveAnswer2 { get; set; }
    public string PositiveReply { get; set; }
    public int PositiveRating { get; set; }
    public string EvaLeadershipId { get; set; }
    public string InnovationComment { get; set; }
    public string InnovationReply { get; set; }
    public int InnovationRating { get; set; }
    public string LeadsComment { get; set; }
    public string LeadsReply { get; set; }
    public int LeadsRating { get; set; }
    public string ResultComment { get; set; }
    public string ResultReply { get; set; }
    public int ResultRating { get; set; }
    public string EvaPersonalId { get; set; }
    public string Answer1 { get; set; }
    public string Answer2 { get; set; }
    public string Answer3 { get; set; }
    public string Answer4 { get; set; }
    public string Answer5 { get; set; }
    public string ManagerComment { get; set; }
    public string EvaPersonalDevId { get; set; }
    public string DevelopmentNeedOne { get; set; }
    public string SupportByOne { get; set; }
    public DateTime TimelineOne { get; set; }
    public DateTime ReviewDateOne { get; set; }
    public string DevelopmentNeedTwo { get; set; }
    public string SupportByTwo { get; set; }
    public DateTime TimelineTwo { get; set; }
    public DateTime ReviewDateTwo { get; set; }
    public string DevelopmentNeedThree { get; set; }
    public string SupportByThree { get; set; }
    public DateTime TimelineThree { get; set; }
    public DateTime ReviewDateThree { get; set; }
    public string ManagerCommentDev { get; set; }
    public string RejectRemarks { get; set; }
    public string AcceptRemarks { get; set; }
    public string ProbationReview { get; set; }

}
