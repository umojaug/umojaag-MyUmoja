import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../components/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";
import { usePostData } from "../../../hooks/dataApi";
import {
  SelectFromDb,
  SelectFromOptions,
} from "../../../components/SelectList";
import DatePicker from "../../../components/DatePicker";
import SaveButton from "../../../components/button/SaveButton";

const schema = yup.object({
  excutionId: yup.string().max(50),
  rmId: yup.string().required("Required.").max(50),
  auditStartDate: yup.date().required("Required."),
  auditEndDate: yup.date().required("Required."),
  periodUnderAuditFrom: yup.date().required("Required."),
  periodUnderAuditTill: yup.date().required("Required."),
  lastAuditPeriod: yup.string().required("Required.").max(50),
  auditNotification: yup.string().required("Required.").max(50),
  auditObjectives: yup.string().required("Required.").max(50),
  parDateOfAudit: yup.string().required("Required."),
  numberOfBorrowersAudit: yup.string().required("Required.").max(50),
  totalNumberOfBranchStaff: yup.string().required("Required.").max(50),
  priorFraudReport: yup.string().required("Required.").max(50),
  staffTurnover: yup.string().required("Required.").max(50),
});

const RegionExcutionForm = ({
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
    rmId,
    auditStartDate,
    auditEndDate,
    periodUnderAuditTill,
    periodUnderAuditFrom,
    lastAuditPeriod,
    auditNotification,
    auditObjectives,
    parDateOfAudit,
    numberOfBorrowersAudit,
    totalNumberOfBranchStaff,
    priorFraudReport,
    staffTurnover,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var datas = new FormData();
    datas.append("excutionId", formData.excutionId);
    datas.append("auditName", formData.auditName);
    datas.append("branchId", formData.branchId);
    datas.append("rmId", formData.rmId);
    datas.append(
      "auditStartDate",
      moment.utc(formData.auditStartDate).local().format("YYYY-MM-DD")
    );
    datas.append(
      "auditEndDate",
      moment.utc(formData.auditEndDate).local().format("YYYY-MM-DD")
    );
    datas.append(
      "periodUnderAuditFrom",
      moment.utc(formData.periodUnderAuditFrom).local().format("YYYY-MM-DD")
    );
    datas.append(
      "periodUnderAuditTill",
      moment.utc(formData.periodUnderAuditTill).local().format("YYYY-MM-DD")
    );
    // var tmpDate = new Date();
    // formData.lastAuditPeriod === null || formData.lastAuditPeriod === ""
    // 	? (tmpDate = "1980-12-31")
    // 	: (tmpDate = moment
    // 			.utc(formData.lastAuditPeriod)
    // 			.local()
    // 			.format("YYYY-MM-DD"));
    datas.append("lastAuditPeriod", formData.lastAuditPeriod);
    datas.append("auditNotification", formData.auditNotification);
    datas.append("auditObjectives", formData.auditObjectives);
    datas.append("parDateOfAudit", formData.parDateOfAudit);
    datas.append("numberOfBorrowersAudit", formData.numberOfBorrowersAudit);
    datas.append("totalNumberOfBranchStaff", formData.totalNumberOfBranchStaff);
    datas.append("priorFraudReport", formData.priorFraudReport);
    datas.append("staffTurnover", formData.staffTurnover);

    try {
      const { status, data } = await mutateAsync({
        path: path,
        formData: datas,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        navigate(`/audit/excution/checklist/region/${data}`);
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
      <input type="hidden" {...register("excutionId")} />
      <div className="form-col">
        <SelectFromDb
          control={control}
          label="Select Regional Manager"
          path="/auditExcutionUnit/selectRegionalManager"
          name="rmId"
          errorMessage={rmId?.message}
        />
        <Controller
          control={control}
          name="auditStartDate"
          render={({ field }) => (
            <DatePicker
              label="Audit Start Date"
              field={field}
              errorMessage={auditStartDate?.message}
              isRow={false}
            />
          )}
        />
        <Controller
          control={control}
          name="auditEndDate"
          render={({ field }) => (
            <DatePicker
              label="Audit End Date"
              field={field}
              errorMessage={auditEndDate?.message}
              isRow={false}
            />
          )}
        />

        <Controller
          control={control}
          name="periodUnderAuditFrom"
          render={({ field }) => (
            <DatePicker
              label="Period Under Audit From"
              field={field}
              errorMessage={periodUnderAuditFrom?.message}
              isRow={false}
            />
          )}
        />
        <Controller
          control={control}
          name="periodUnderAuditTill"
          render={({ field }) => (
            <DatePicker
              label="Period Under Audit Till"
              field={field}
              errorMessage={periodUnderAuditTill?.message}
              isRow={false}
            />
          )}
        />

        <Input
          name="lastAuditPeriod"
          label="Last Audit Period"
          type="text"
          register={register}
          errorMessage={lastAuditPeriod?.message}
        />
        <Input
          name="auditNotification"
          label="Region audit notification, with dates for entry and exit meetings"
          type="text"
          register={register}
          errorMessage={auditNotification?.message}
        />
        {/* <Input
          name="auditObjectives"
          label="Audit Execution Status"
          type="text"
          register={register}
          errorMessage={auditObjectives?.message}
        /> */}
        <SelectFromOptions
          register={register}
          options={["Pending", "Done"]}
          label="Audit Execution Status"
          name="auditObjectives"
          errorMessage={auditObjectives?.message}
        />

        <Input
          name="parDateOfAudit"
          label="PAR upto Date Of Audit"
          type="text"
          register={register}
          errorMessage={parDateOfAudit?.message}
        />
        <Input
          name="numberOfBorrowersAudit"
          label="Number Of Borrowers Audit"
          type="text"
          register={register}
          errorMessage={numberOfBorrowersAudit?.message}
        />
        <Input
          name="totalNumberOfBranchStaff"
          label="Total Number Of Region Staff"
          type="text"
          register={register}
          errorMessage={totalNumberOfBranchStaff?.message}
        />
        <Input
          name="priorFraudReport"
          label="Prior Fraud Report"
          type="text"
          register={register}
          errorMessage={priorFraudReport?.message}
        />
        <Input
          name="staffTurnover"
          label="Staff Turnover(%)"
          type="text"
          register={register}
          errorMessage={staffTurnover?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default RegionExcutionForm;
