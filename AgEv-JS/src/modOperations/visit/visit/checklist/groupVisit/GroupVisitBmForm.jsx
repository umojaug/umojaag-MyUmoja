import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SaveButton from "../../../../../components/button/SaveButton";
import Label from "../../../../../components/Label";
import TextArea from "../../../../../components/TextArea";

const schema = yup.object({
  verificationId: yup.string(),
  bmComments: yup.string().required("Required.").max(500),
});

const GroupVisitBmForm = ({
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
    // reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { bmComments } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
      });

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
      <input type="hidden" {...register("verificationId")} />

      <div className="form-col">
        <Label value={defaultValues.workToBeDone} />
        <Label label="Status" value={defaultValues.status} />
        <Label label="Number" value={defaultValues.number} />
        <Label label="Major Issues Identified" value={defaultValues.findings} />
        <Label label="Taken Steps" value={defaultValues.takenSteps} />

        <TextArea
          control={control}
          name="bmComments"
          label="Comments of BM"
          areaHeight="h-14"
          errorMessage={bmComments?.message}
          isAutoFocus={true}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default GroupVisitBmForm;
