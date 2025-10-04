import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../../hooks/dataApi";
import SaveButton from "../../../../../components/button/SaveButton";
import { useNavigate } from "react-router-dom";
import Input from "../../../../../components/Input";
import { SelectFromOptions } from "../../../../../components/SelectList";
import TextArea from "../../../../../components/TextArea";

const schema = yup.object({
  seAuditIssueId: yup.number(),
  allVisitId: yup.string().required("Required.").max(50),
  issues: yup.string().required("Required.").max(500),
  isSettled: yup.string().required("Required.").max(500),
  pendingReason: yup.string().required("Required.").max(500),
});

const AuditIssuesForm = ({
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
  const { issues, isSettled, pendingReason } = errors;

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
      <input type="hidden" {...register("seAuditIssueListId")} />
      <div className="form-col">
        <Input
          name="issues"
          label="Issue"
          type="text"
          register={register}
          errorMessage={issues?.message}
        />
        <SelectFromOptions
          register={register}
          options={["Yes", "No"]}
          label="Is Settled"
          name="isSettled"
          errorMessage={isSettled?.message}
        />

        <TextArea
          control={control}
          name="pendingReason"
          label="Pending Reason"
          areaHeight="h-14"
          errorMessage={pendingReason?.message}
          isAutoFocus={true}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AuditIssuesForm;
