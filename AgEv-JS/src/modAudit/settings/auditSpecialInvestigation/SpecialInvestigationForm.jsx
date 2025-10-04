import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import SaveButton from "../../../components/button/SaveButton";
import TextArea from "../../../components/TextArea";

const schema = yup.object({
  specialInvestigationId: yup.string().max(50),
  guideline: yup.string().required("Required."),
  testSteps: yup.string().required("Required."),
});

const SpecialInvestigationForm = ({
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
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { guideline, testSteps } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("specialInvestigationId", formData.specialInvestigationId);
    data.append("guideline", formData.guideline);
    data.append("testSteps", formData.testSteps);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
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
      <input type="hidden" {...register("specialInvestigationId")} />
      <div className="form-col">
        <Input
          name="guideline"
          label="Guideline"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={guideline?.message}
        />
        <TextArea
          control={control}
          areaHeight="h-36"
          label="Audit Test"
          name="testSteps"
          errorMessage={testSteps?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default SpecialInvestigationForm;
