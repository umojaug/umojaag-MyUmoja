
using Microsoft.AspNetCore.Http;
using System;

namespace GrapesTl.Models;

public class BranchVisitDetails
{
    public string BranchVisitDetailsId { get; set; }
    public string BranchVisitId { get; set; }
    public string TopicAssessed { get; set; }
    public string Findings { get; set; }
    public string RatingGiven { get; set; }
    public string ActionToBeTaken { get; set; }
    public string OwnerAssigned { get; set; }
    public DateTime ActionCompletionDate { get; set; }
    public IFormFile File { get; set; }

}

public class BranchVisitDetailsView:BranchVisitDetails
{
    public string Attachment { get; set; }
  
}



public class BranchVisitDetailsFeedback
{
    public string BranchVisitDetailsId { get; set; }
    public string DetailsStatus { get; set; }
    public string Remarks { get; set; }

}



