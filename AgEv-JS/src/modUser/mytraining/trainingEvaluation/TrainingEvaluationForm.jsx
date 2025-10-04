import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import SaveButton from "../../../components/button/SaveButton";
import Input from "../../../components/Input";
import RadioButtons from "../../../components/RadioButtons";

const schema = yup.object({
  topicId: yup.string().required("Required.").max(50),
  satisfiedWithOverAllTrainingSession: yup
    .string()
    .required("Required.")
    .max(50),
  relevantTrainingContentToYourJob: yup.string().required("Required.").max(50),
  effectiveTrainerInDeliveringTheContent: yup
    .string()
    .required("Required.")
    .max(50),
  usefulTrainingMaterialsProvided: yup.string().required("Required.").max(50),
  engagingTrainingSession: yup.string().required("Required.").max(50),
  likelyApplyLearnedJob: yup.string().required("Required.").max(50),
  didYouLikeMostAboutTheTrainingSession: yup
    .string()
    .required("Required.")
    .max(4000),
  couldImprovedFutureTrainingSessions: yup
    .string()
    .required("Required.")
    .max(4000),
  anyAdditionalCommentsOrSuggestions: yup
    .string()
    .required("Required.")
    .max(4000),
  trainingContent: yup.string().required("Required.").max(50),
  trainersKnowledge: yup.string().required("Required.").max(50),
  trainingEnvironment: yup.string().required("Required.").max(50),
  overallExperience: yup.string().required("Required.").max(50),
});

const TrainingEvaluationForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    satisfiedWithOverAllTrainingSession,
    relevantTrainingContentToYourJob,
    effectiveTrainerInDeliveringTheContent,
    usefulTrainingMaterialsProvided,
    engagingTrainingSession,
    likelyApplyLearnedJob,
    didYouLikeMostAboutTheTrainingSession,
    couldImprovedFutureTrainingSessions,
    anyAdditionalCommentsOrSuggestions,
    trainingContent,
    trainersKnowledge,
    trainingEnvironment,
    overallExperience,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
      }
      if (status === 204) {
        toast.success("Update successful!");
        navigate(returnPath);
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :", error.message);
      }
    } finally {
      action();
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("topicId")} />
      <div className="form-col">
        <RadioButtons
          register={register}
          options={[
            "Very Satisfied",
            "Satisfied",
            "Neutral",
            "Dissatisfied",
            "Very Dissatisfied",
          ]}
          label="How satisfied are you with the overall training session?"
          name="satisfiedWithOverAllTrainingSession"
          errorMessage={satisfiedWithOverAllTrainingSession?.message}
        />
        <RadioButtons
          register={register}
          options={[
            "Very Relevant",
            "Relevant",
            "Neutral",
            "Irrelevant",
            "Very Irrelevant",
          ]}
          label="How relevant was the training content to your job?"
          name="relevantTrainingContentToYourJob"
          errorMessage={relevantTrainingContentToYourJob?.message}
        />
        <RadioButtons
          register={register}
          options={[
            "Very Relevant",
            "Relevant",
            "Neutral",
            "Irrelevant",
            "Very Irrelevant",
          ]}
          label="How effective was the trainer in delivering the content?"
          name="effectiveTrainerInDeliveringTheContent"
          errorMessage={effectiveTrainerInDeliveringTheContent?.message}
        />
        <RadioButtons
          register={register}
          options={[
            "Very Useful",
            "Useful",
            "Neutral",
            "Not Useful",
            "Very Not Useful",
          ]}
          label="How useful were the training materials provided?"
          name="usefulTrainingMaterialsProvided"
          errorMessage={usefulTrainingMaterialsProvided?.message}
        />
        <RadioButtons
          register={register}
          options={[
            "Very Engaging",
            "Engaging",
            "Neutral",
            "Not Engaging",
            "Very Not Engaging",
          ]}
          label="How engaging was the training session?"
          name="engagingTrainingSession"
          errorMessage={engagingTrainingSession?.message}
        />
        <RadioButtons
          register={register}
          options={[
            "Very Likely",
            "Likely",
            "Neutral",
            "Unlikely",
            "Very Unlikely",
          ]}
          label="How likely are you to apply what you learned in your job?"
          name="likelyApplyLearnedJob"
          errorMessage={likelyApplyLearnedJob?.message}
        />
        <Input
          name="didYouLikeMostAboutTheTrainingSession"
          label="What did you like most about the training session?"
          type="text"
          register={register}
          errorMessage={didYouLikeMostAboutTheTrainingSession?.message}
        />
        <Input
          name="couldImprovedFutureTrainingSessions"
          label="What could be improved in future training sessions?"
          type="text"
          register={register}
          errorMessage={couldImprovedFutureTrainingSessions?.message}
        />
        <Input
          name="anyAdditionalCommentsOrSuggestions"
          label="Any additional comments or suggestions?"
          type="text"
          register={register}
          errorMessage={anyAdditionalCommentsOrSuggestions?.message}
        />
        <RadioButtons
          register={register}
          options={["1", "2", "3", "4", "5"]}
          label="Training Content"
          name="trainingContent"
          errorMessage={trainingContent?.message}
          sidebySide={true}
          labelSpace="w-48 md:w-64"
        />
        <RadioButtons
          register={register}
          options={["1", "2", "3", "4", "5"]}
          label="Trainer's Knowledge"
          name="trainersKnowledge"
          errorMessage={trainersKnowledge?.message}
          sidebySide={true}
          labelSpace="w-48 md:w-64"
        />
        <RadioButtons
          register={register}
          options={["1", "2", "3", "4", "5"]}
          label="Training Environment"
          name="trainingEnvironment"
          errorMessage={trainingEnvironment?.message}
          sidebySide={true}
          labelSpace="w-48 md:w-64"
        />
        <RadioButtons
          register={register}
          options={["1", "2", "3", "4", "5"]}
          label="Overall Experience"
          name="overallExperience"
          errorMessage={overallExperience?.message}
          sidebySide={true}
          labelSpace="w-48 md:w-64"
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default TrainingEvaluationForm;
