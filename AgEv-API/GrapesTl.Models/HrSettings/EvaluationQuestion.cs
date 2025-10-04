namespace GrapesTl.Models;

public class EvaluationQuestion
{
    public long QuestionId { get; set; }
    public string EvaluationTypeName { get; set; }
    public string Question { get; set; }
    public int Marks { get; set; }
}
