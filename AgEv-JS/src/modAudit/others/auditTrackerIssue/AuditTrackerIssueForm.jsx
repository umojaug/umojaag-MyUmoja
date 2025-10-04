import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import DatePicker from "../../../components/DatePicker";
import moment from "moment";

const schema = yup.object({
  auditTrackerIssueId: yup.string().max(50),
  auditType: yup.string().max(50).required("Required."),
  year: yup.string().max(50).required("Required."),
  monthOfAudit: yup.string().max(50).required("Required."),
  departmentId: yup.string().max(50).required("Required."),
  branchId: yup.string().max(50).required("Required."),
  regionId: yup.string().max(50).required("Required."),
  auditIssue: yup.string().max(50).required("Required."),
  risk: yup.string().max(50).required("Required."),
  recommendations: yup.string().max(50).required("Required."),
  implementedBy: yup.string().max(50).required("Required."),
  commitmentDate: yup.date(),
  implementationDate: yup.date(),
  issueStatus: yup.string().max(50).required("Required."),
  iaInCharge: yup.string().max(50).required("Required."),
  followUpDate: yup.date().required("Required."),
});

const AuditTrackerIssueForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    auditType,
    year,
    monthOfAudit,
    departmentId,
    branchId,
    regionId,
    auditIssue,
    risk,
    recommendations,
    implementedBy,
    commitmentDate,
    implementationDate,
    issueStatus,
    iaInCharge,
    followUpDate,
  } = errors;

  const branchSelectId = watch("branchId", defaultValues.branchId);

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("auditTrackerIssueId", formData.auditTrackerIssueId);
    data.append("auditType", formData.auditType);
    data.append("year", formData.year);
    data.append("monthOfAudit", formData.monthOfAudit);
    data.append("departmentId", formData.departmentId);
    data.append("branchId", formData.branchId);
    data.append("regionId", formData.regionId);
    data.append("auditIssue", formData.auditIssue);
    data.append("risk", formData.risk);
    data.append("recommendations", formData.recommendations);
    data.append("implementedBy", formData.implementedBy);
    data.append(
      "commitmentDate",
      moment.utc(formData.commitmentDate).local().format("YYYY-MM-DD")
    );
    data.append(
      "implementationDate",
      moment.utc(formData.implementationDate).local().format("YYYY-MM-DD")
    );

    data.append("issueStatus", formData.issueStatus);
    data.append("iaInCharge", formData.iaInCharge);
    data.append(
      "followUpDate",
      moment.utc(formData.followUpDate).local().format("YYYY-MM-DD")
    );

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
      <div className="form-col">
        <Input
          name="auditType"
          label="Audit Type"
          type="text"
          register={register}
          errorMessage={auditType?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.years}
          label="Year"
          name="year"
          errorMessage={year?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.monthNames}
          label="Month Of Audit"
          name="monthOfAudit"
          errorMessage={monthOfAudit?.message}
        />
        <SelectFromDb
          control={control}
          label="Department"
          path="/departments/select"
          name="departmentId"
          errorMessage={departmentId?.message}
        />
        <SelectFromDb
          control={control}
          label="Branch Name"
          path="/branches/select"
          name="branchId"
          errorMessage={branchId?.message}
        />
        <SelectFromDb
          control={control}
          label="Region Name"
          path="/Regions/select"
          name="regionId"
          errorMessage={regionId?.message}
        />
        <Input
          name="auditIssue"
          label="Audit Issue"
          type="text"
          register={register}
          errorMessage={auditIssue?.message}
        />
        <SelectFromOptions
          register={register}
          options={[" High", "Medium", "Low"]}
          label="Risks"
          name="risk"
          errorMessage={risk?.message}
        />
        <Input
          name="recommendations"
          label="Recommendations"
          type="text"
          register={register}
          errorMessage={recommendations?.message}
        />
        <SelectFromDb
          control={control}
          label="Implemented By"
          path={`/employees/SelectByBranch/${
            branchSelectId === "" ? 0 : branchSelectId
          }`}
          name="implementedBy"
          errorMessage={implementedBy?.message}
        />

        <Controller
          control={control}
          name="commitmentDate"
          render={({ field }) => (
            <DatePicker
              label="Commitment Date"
              field={field}
              errorMessage={commitmentDate?.message}
              isRow={false}
            />
          )}
        />
        <Controller
          control={control}
          name="implementationDate"
          render={({ field }) => (
            <DatePicker
              label="Implementation Date"
              field={field}
              errorMessage={implementationDate?.message}
              isRow={false}
            />
          )}
        />

        <SelectFromOptions
          register={register}
          options={["INPROGRESS", "OPEN/TBD", "CLOSED", "OVERDUE"]}
          label="Issue Status"
          name="issueStatus"
          errorMessage={issueStatus?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.iAInCharge}
          name="iaInCharge"
          label="IA In Charge"
          errorMessage={iaInCharge?.message}
        />

        <Controller
          control={control}
          name="followUpDate"
          render={({ field }) => (
            <DatePicker
              label="Follow Up Date"
              field={field}
              errorMessage={followUpDate?.message}
              isRow={false}
            />
          )}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AuditTrackerIssueForm;
