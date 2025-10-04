import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SaveButton from "../../../../../components/button/SaveButton";
import TextArea from "../../../../../components/TextArea";
import Label from "../../../../../components/Label";

const schema = yup.object({
  docCheckId: yup.string(),
  bmComments: yup.string().required("Required.").max(500),
});

const DocCheckBmForm = ({
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
    control,
    // reset,
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
      <input type="hidden" {...register("docCheckId")} />
      <Label label="Work to be done" value={defaultValues.workToBeDone} />
      <Label label="Status " value={defaultValues.status} />
      <Label
        label="Identified Major Issues"
        value={defaultValues.identifiedMajor}
      />
      <Label label="Taken Steps" value={defaultValues.takenSteps} />
      <div className="form-col">
        <TextArea
          control={control}
          name="bmComments"
          label="Comments Of BM"
          areaHeight="h-14"
          errorMessage={bmComments?.message}
          isAutoFocus={true}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default DocCheckBmForm;
