namespace GrapesTl.Models;

public class TrainingEvaluation
{
    public long EvaluationId { get; set; }
    public string TopicId { get; set; }
    public string SatisfiedWithOverAllTrainingSession { get; set; }
    public string RelevantTrainingContentToYourJob { get; set; }
    public string EffectiveTrainerInDeliveringTheContent { get; set; }
    public string UsefulTrainingMaterialsProvided { get; set; }
    public string EngagingTrainingSession { get; set; }
    public string LikelyApplyLearnedJob { get; set; }
    public string DidYouLikeMostAboutTheTrainingSession { get; set; }
    public string CouldImprovedFutureTrainingSessions { get; set; }
    public string AnyAdditionalCommentsOrSuggestions { get; set; }
    public string TrainingContent { get; set; }
    public string TrainersKnowledge { get; set; }
    public string TrainingEnvironment { get; set; }
    public string OverallExperience { get; set; }

}
public class TrainingEvaluationView : TrainingEvaluation
{
    public string CategoryName { get; set; }
    public string TrainingName { get; set; }
    public string DesignationName { get; set; }
    public string EmployeePin { get; set; }
    public string EmployeeName { get; set; }
}