import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../../hooks/dataApi";
import { SelectFromOptions } from "../../../../../components/SelectList";
import SaveButton from "../../../../../components/button/SaveButton";
import Label from "../../../../../components/Label";
import { useNavigate } from "react-router-dom";
import TextArea from "../../../../../components/TextArea";

const schema = yup.object({
  cashBalanceId: yup.number(),
  workToBeDone: yup.string(),
  status: yup.string().required("Required.").max(50),
  identifiedMajor: yup.string().when("status", {
    is: "Yes",
    then: (schema) => schema.required("Required."),
    otherwise: () => yup.string(),
  }),
  takenSteps: yup.string().when("status", {
    is: "Yes",
    then: (schema) => schema.required("Required."),
    otherwise: () => yup.string(),
  }),
});

const CashAtHandForm = ({
  defaultValues,
  returnPath,
  action,
  btnText,
  path,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { status, identifiedMajor, takenSteps } = errors;

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
      <input type="hidden" {...register("cashBalanceListId")} />
      <div className="form-col">
        <Label value={defaultValues.workToBeDone} />
        <SelectFromOptions
          register={register}
          options={["Yes", "No"]}
          label="Status"
          name="status"
          errorMessage={status?.message}
        />

        <TextArea
          control={control}
          name="identifiedMajor"
          label="Major Issues Identified"
          areaHeight="h-14"
          errorMessage={identifiedMajor?.message}
          isAutoFocus={true}
        />
        <TextArea
          control={control}
          name="takenSteps"
          label="Steps Taken"
          areaHeight="h-14"
          errorMessage={takenSteps?.message}
          isAutoFocus={true}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default CashAtHandForm;
