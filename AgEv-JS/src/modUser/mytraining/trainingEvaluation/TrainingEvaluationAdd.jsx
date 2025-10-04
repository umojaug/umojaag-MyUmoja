import React from "react";
import TrainingEvaluationForm from "./TrainingEvaluationForm";
import TopHeader from "../../../components/TopHeader";
import { useParams } from "react-router-dom";

const TrainingEvaluationAdd = () => {
  const { id } = useParams();
  const defaultValues = {
    topicId: id,
    satisfiedWithOverAllTrainingSession: "",
    relevantTrainingContentToYourJob: "",
    effectiveTrainerInDeliveringTheContent: "",
    usefulTrainingMaterialsProvided: "",
    engagingTrainingSession: "",
    likelyApplyLearnedJob: "",
    didYouLikeMostAboutTheTrainingSession: "",
    couldImprovedFutureTrainingSessions: "",
    anyAdditionalCommentsOrSuggestions: "",
    trainingContent: "",
    trainersKnowledge: "",
    trainingEnvironment: "",
    overallExperience: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Training Evulation Update"
        btn="Return"
        path="/training"
      />
      <TrainingEvaluationForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/TrainingEvaluation/create"
        returnPath="/training"
      />
    </div>
  );
};

export default TrainingEvaluationAdd;
