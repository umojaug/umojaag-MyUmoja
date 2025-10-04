import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import RadioButtons from "../../components/RadioButtons";
import TextArea from "../../components/TextArea";

const schema = yup.object({
  auditFeedbackId: yup.string().max(50),
  whatWentWell: yup.string().required("Required.").max(300),
  handledBetter: yup.string().required("Required.").max(300),
  keyLearningPoints: yup.string().required("Required.").max(300),
  interPersonalRatings: yup.string().required("Required.").max(50),
  interPersonalComments: yup.string().required("Required.").max(300),
  abilityToRatings: yup.string().required("Required.").max(50),
  abilityToComments: yup.string().required("Required.").max(300),
  auditFindingsRatings: yup.string().required("Required.").max(50),
  auditFindingsComments: yup.string().required("Required.").max(300),
  auditScopeRatings: yup.string().required("Required.").max(50),
  auditScopeComments: yup.string().required("Required.").max(300),
  agreementWithAuditeesRatings: yup.string().required("Required.").max(50),
  agreementWithAuditeesComments: yup.string().required("Required.").max(300),
  otherComments: yup.string().required("Required.").max(300),
});

const AuditFeedbackForm = ({
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
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    whatWentWell,
    handledBetter,
    keyLearningPoints,
    interPersonalRatings,
    interPersonalComments,
    abilityToRatings,
    abilityToComments,
    auditFindingsRatings,
    auditFindingsComments,
    auditScopeRatings,
    auditScopeComments,
    agreementWithAuditeesRatings,
    agreementWithAuditeesComments,
    otherComments,
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
        navigate(returnPath);
      } else if (status === 204) {
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
      <input type="hidden" {...register("auditFeedbackId")} />
      <input type="hidden" {...register("WorkPlanId")} />
      <div className="form-col">
        <TextArea
          control={control}
          name="whatWentWell"
          label="What went well with the just concluded Internal Audit review exercise?"
          type="text"
          errorMessage={whatWentWell?.message}
        />
        <TextArea
          control={control}
          name="handledBetter"
          label="What could have been handled better with the just concluded Internal audit review?"
          type="text"
          errorMessage={handledBetter?.message}
        />
        <TextArea
          control={control}
          name="keyLearningPoints"
          label="What have been your key learning points after this review?"
          type="text"
          errorMessage={keyLearningPoints?.message}
        />

        <p>Rating: 1- Poor 2- Fair 3- Good 4- Very Good 5 - Excellent</p>

        <RadioButtons
          register={register}
          options={["1", "2", "3", "4"]}
          label="Inter personal relationship between the Auditors & the Auditees Ratin"
          name="interPersonalRatings"
          errorMessage={interPersonalRatings?.message}
        />

        <TextArea
          control={control}
          name="interPersonalComments"
          label="Inter personal relationship between the Auditors & the Auditees COMMENTS ON THE RATING AWARDED"
          type="text"
          errorMessage={interPersonalComments?.message}
        />
        <RadioButtons
          register={register}
          options={["1", "2", "3", "4"]}
          label="Ability to engage the auditee on issues observed during the course of the audit. Ratings"
          name="abilityToRatings"
          errorMessage={abilityToRatings?.message}
        />

        <TextArea
          control={control}
          name="abilityToComments"
          label="Ability to engage the auditee on issues observed during the course of the audit. COMMENTS ON THE RATING AWARDED"
          type="text"
          errorMessage={abilityToComments?.message}
        />

        <RadioButtons
          register={register}
          options={["1", "2", "3", "4"]}
          label="Timely communication of Audit findings to Auditees. Ratings"
          name="auditFindingsRatings"
          errorMessage={auditFindingsRatings?.message}
        />

        <TextArea
          control={control}
          name="auditFindingsComments"
          label="Timely communication of Audit findings to Auditees. COMMENTS ON THE RATING AWARDED"
          type="text"
          errorMessage={auditFindingsComments?.message}
        />

        <RadioButtons
          register={register}
          options={["1", "2", "3", "4"]}
          label="Timely communication of Audit Scope to Auditees. Ratings"
          name="auditScopeRatings"
          errorMessage={auditScopeRatings?.message}
        />

        <TextArea
          control={control}
          name="auditScopeComments"
          label="Timely communication of Audit Scope to Auditees. COMMENTS ON THE RATING AWARDEDComments"
          type="text"
          errorMessage={auditScopeComments?.message}
        />
        <RadioButtons
          register={register}
          options={["1", "2", "3", "4"]}
          label="Agreement with Auditees on action plans for raised/ unresolved issues. Ratings"
          name="agreementWithAuditeesRatings"
          errorMessage={agreementWithAuditeesRatings?.message}
        />

        <TextArea
          control={control}
          name="agreementWithAuditeesComments"
          label="Agreement with Auditees on action plans for raised/ unresolved issues. COMMENTS ON THE RATING AWARDED"
          type="text"
          errorMessage={agreementWithAuditeesComments?.message}
        />

        <TextArea
          control={control}
          name="otherComments"
          label="ANY OTHER COMMENT:"
          type="text"
          errorMessage={otherComments?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AuditFeedbackForm;
