import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import {
  SelectFromDb,
  SelectFromOptions,
} from "../../../components/SelectList";
import { selectOptions } from "../../../data/selectOptions";
import Input from "../../../components/Input";
import SaveButton from "../../../components/button/SaveButton";

const schema = yup.object({
  workPlanId: yup.string().max(50),
  monthName: yup.string().required("Required."),
  auditor: yup.string().required("Required."),
  fieldDays: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  expectedCost: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  auditStatus: yup.string().required("Required.").max(50),
  reportStatus: yup.string().required("Required.").max(50),
  discussionStatus: yup.string().required("Required.").max(50),
  followUpStatus: yup.string().required("Required.").max(50),
});

const AuditWorkplanForm = ({
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
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    monthName,
    auditor,
    fieldDays,
    expectedCost,
    auditStatus,
    reportStatus,
    discussionStatus,
    followUpStatus,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("workPlanId", formData.workPlanId);
    data.append("monthName", formData.monthName);
    data.append("auditor", formData.auditor);
    data.append("fieldDays", formData.fieldDays);
    data.append("expectedCost", formData.expectedCost);
    data.append("auditStatus", formData.auditStatus);
    data.append("reportStatus", formData.reportStatus);
    data.append("discussionStatus", formData.discussionStatus);
    data.append("followUpStatus", formData.followUpStatus);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
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
      <input type="hidden" {...register("summaryId")} />
      <div className="form-col">
        <SelectFromOptions
          register={register}
          options={selectOptions.monthNames}
          label="Month"
          name="monthName"
          errorMessage={monthName?.message}
        />

        <SelectFromDb
          control={control}
          label="Auditor"
          path="/employees/selectAuditor"
          name="auditor"
          errorMessage={auditor?.message}
        />

        <Input
          name="fieldDays"
          label="Field Days"
          type="text"
          register={register}
          errorMessage={fieldDays?.message}
        />

        <Input
          name="expectedCost"
          label="Expected Cost"
          type="text"
          register={register}
          errorMessage={expectedCost?.message}
        />
        <SelectFromOptions
          register={register}
          options={["Pending", "In Progress", "Done"]}
          label="Audit Status"
          name="auditStatus"
          errorMessage={auditStatus?.message}
        />
        <SelectFromOptions
          register={register}
          options={["Pending", "In Progress", "Done"]}
          label="Report Status"
          name="reportStatus"
          errorMessage={reportStatus?.message}
        />
        <SelectFromOptions
          register={register}
          options={["Pending", "In Progress", "Done"]}
          label="Management discussion status (report)"
          name="discussionStatus"
          errorMessage={discussionStatus?.message}
        />
        <SelectFromOptions
          register={register}
          options={["Pending", "In Progress", "Done"]}
          label="Follow up of issues status"
          name="followUpStatus"
          errorMessage={followUpStatus?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AuditWorkplanForm;
