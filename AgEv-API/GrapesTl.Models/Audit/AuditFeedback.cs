namespace GrapesTl.Models;

public class AuditFeedback
{
    public string AuditFeedbackId { get; set; }
    public string WorkPlanId { get; set; }
    public string WhatWentWell { get; set; }
    public string HandledBetter { get; set; }
    public string KeyLearningPoints { get; set; }
    public string InterPersonalRatings { get; set; }
    public string InterPersonalComments { get; set; }
    public string AbilityToRatings { get; set; }
    public string AbilityToComments { get; set; }
    public string AuditFindingsRatings { get; set; }
    public string AuditFindingsComments { get; set; }
    public string AuditScopeRatings { get; set; }
    public string AuditScopeComments { get; set; }
    public string AgreementWithAuditeesRatings { get; set; }
    public string AgreementWithAuditeesComments { get; set; }
    public string OtherComments { get; set; }


}

public class AuditFeedbackView : AuditFeedback
{
    public string EmployeeName { get; set; }
    public string AuName { get; set; }
    public string MonthName { get; set; }
    public string AuditYear { get; set; }
}



public class AuditStatusDone
{
    public string WorkPlanId { get; set; }
    public string MonthName { get; set; }
    public string AuName { get; set; }
    public int AuditYear { get; set; }
    public string AuditorName { get; set; }

}

