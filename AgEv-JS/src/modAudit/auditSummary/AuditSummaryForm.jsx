import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import Label from "../../components/Label";

const schema = yup.object({
  annualAudit: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  followUpAudit: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  units: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  regionsAreas: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  totalAudit: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  numberOfAuditStaff: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
});

const AuditSummaryForm = ({
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
    // control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    annualAudit,
    followUpAudit,
    units,
    regionsAreas,
    totalAudit,
    numberOfAuditStaff,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var datas = new FormData();
    datas.append("SummaryId", formData.summaryId);
    datas.append("annualAudit", formData.annualAudit);
    datas.append("followUpAudit", formData.followUpAudit);
    datas.append("units", formData.units);
    datas.append("regionsAreas", formData.regionsAreas);
    datas.append("totalAudit", formData.totalAudit);
    datas.append("numberOfAuditStaff", formData.numberOfAuditStaff);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: datas,
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
        <Label label="Audit Year" value={defaultValues.auditYear} />
        <Label
          label="Criteria for branch scheduling :"
          value={defaultValues.branchScCriteria}
        />
        <Input
          name="annualAudit"
          label="Annual Audit :"
          type="text"
          register={register}
          errorMessage={annualAudit?.message}
        />
        <Input
          name="followUpAudit"
          label="Follow Up Audit :"
          type="text"
          register={register}
          errorMessage={followUpAudit?.message}
        />
        <Input
          name="units"
          label="Units :"
          type="text"
          register={register}
          errorMessage={units?.message}
        />
        <Input
          name="regionsAreas"
          label="Regions & Areas :"
          type="text"
          register={register}
          errorMessage={regionsAreas?.message}
        />

        <Input
          name="totalAudit"
          label="Total Audits"
          type="text"
          register={register}
          errorMessage={totalAudit?.message}
        />

        <Input
          name="numberOfAuditStaff"
          label="Number Of Audit Staff"
          type="text"
          register={register}
          errorMessage={numberOfAuditStaff?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AuditSummaryForm;
