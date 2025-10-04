namespace GrapesTl.Models;

public class EvaLeadership
{
    public string EvaLeadershipId { get; set; }
    public string EvaluationId { get; set; }
    public string InnovationComment { get; set; }
    public string InnovationReply { get; set; }
    public int InnovationRating { get; set; }
    public string LeadsComment { get; set; }
    public string LeadsReply { get; set; }
    public int LeadsRating { get; set; }
    public string ResultComment { get; set; }
    public string ResultReply { get; set; }
    public int ResultRating { get; set; }
    public int IsLock { get; set; }
}
