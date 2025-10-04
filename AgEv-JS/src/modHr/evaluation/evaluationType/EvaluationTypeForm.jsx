import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import SaveButton from "../../../components/button/SaveButton";
import { SelectFromOptions } from "../../../components/SelectList";

const schema = yup.object({
  evaluationTypeId: yup.string().max(50),
  evaluationTypeName: yup.string().required("Required.").max(50),
  frequency: yup.string().required("Required.").max(50),
});

const EvaluationTypeForm = ({
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
  const { evaluationTypeName, frequency } = errors;

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
      <input type="hidden" {...register("evaluationId")} />
      <div className="form-col">
        <Input
          name="evaluationTypeName"
          label="Evaluation Type Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={evaluationTypeName?.message}
        />
        <SelectFromOptions
          register={register}
          options={["Annual", "Three Months", "Six Months"]}
          label="Frequency"
          name="frequency"
          errorMessage={frequency?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default EvaluationTypeForm;
