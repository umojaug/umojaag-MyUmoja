import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import { SelectFromDb } from "../../../components/SelectList";
import SaveButton from "../../../components/button/SaveButton";

const schema = yup.object({
  auditTestStepsId: yup.string().max(50),
  auditAreaId: yup.string().max(50).required("Required."),
  testStepsName: yup.string().required("Required.").max(2500),
});

const AuditTestStepsForm = ({
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
  const { auditAreaId, testStepsName } = errors;

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
      <input type="hidden" {...register("auditTestStepsId")} />
      <SelectFromDb
        control={control}
        label="Audit Area"
        path="/auditTestAreas/select"
        name="auditAreaId"
        errorMessage={auditAreaId?.message}
      />
      <div className="form-col">
        <Input
          name="testStepsName"
          label="Test Step Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={testStepsName?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AuditTestStepsForm;
