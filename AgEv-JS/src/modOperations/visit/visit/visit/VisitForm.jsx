import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import DatePicker from "../../../../components/DatePicker";
import { usePostData } from "../../../../hooks/dataApi";
import SaveButton from "../../../../components/button/SaveButton";
import {
  DataListFromDb,
  SelectFromDb,
  SelectFromOptions,
  SelectSupervisorFromDb,
} from "../../../../components/SelectList";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import TimePicker from "../../../../components/TimePicker";

const schema = yup.object({
  allVisitId: yup.string().max(50),
  visitDate: yup.date().required("Required"),
  visitEndDate: yup.date().required("Required"),
  branchId: yup.string().required("Required.").max(50),
  entryTime: yup.date().required("Required."),
  exitTime: yup.date().required("Required."),
  visitType: yup.string().required("Required.").max(50),
  stayOvernight: yup.string().required("Required.").max(50),
  pinName: yup.string().required("Required.").max(50),
  managerPin: yup.string().required("Required.").max(50),
});

const VisitInfoForm = ({
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
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    visitDate,
    visitEndDate,
    branchId,
    entryTime,
    exitTime,
    visitType,
    stayOvernight,
    pinName,
    managerPin,
  } = errors;
  const branchSelectId = watch("branchId", defaultValues.branchId);

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var tmpData = new FormData();
    tmpData.append("allVisitId", formData.allVisitId);
    tmpData.append(
      "visitDate",
      moment.utc(formData.visitDate).local().format("YYYY-MM-DD")
    );
    tmpData.append(
      "visitEndDate",
      moment.utc(formData.visitEndDate).local().format("YYYY-MM-DD")
    );
    tmpData.append(
      "entryTime",
      moment.utc(formData.entryTime).local().format("HH:mm:ss")
    );
    tmpData.append(
      "exitTime",
      moment.utc(formData.exitTime).local().format("HH:mm:ss")
    );
    tmpData.append("branchId", formData.branchId);
    tmpData.append("visitType", formData.visitType);
    tmpData.append("stayOvernight", formData.stayOvernight);
    tmpData.append("pinName", formData.pinName);
    tmpData.append("managerPin", formData.managerPin);
    try {
      const { data, status } = await mutateAsync({
        path: path,
        formData: tmpData,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        navigate(`/ops/visit/preview/${data}`);
        //navigate(returnPath);
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
      <input type="hidden" {...register("allVisitId")} />
      <div className="form-col">
        <Controller
          control={control}
          name="visitDate"
          render={({ field }) => (
            <DatePicker
              label="Visit Start Date"
              field={field}
              errorMessage={visitDate?.message}
              isRow={false}
            />
          )}
        />
        <Controller
          control={control}
          name="entryTime"
          render={({ field }) => (
            <TimePicker
              label="Entry Time"
              field={field}
              errorMessage={entryTime?.message}
              isRow={false}
            />
          )}
        />
        <Controller
          control={control}
          name="visitEndDate"
          render={({ field }) => (
            <DatePicker
              label="Visit End Date"
              field={field}
              errorMessage={visitEndDate?.message}
              isRow={false}
            />
          )}
        />
        <Controller
          control={control}
          name="exitTime"
          render={({ field }) => (
            <TimePicker
              label="Exit Time"
              field={field}
              errorMessage={exitTime?.message}
              isRow={false}
            />
          )}
        />

        <SelectFromDb
          control={control}
          label="Branch Name"
          path="/branches/select"
          name="branchId"
          errorMessage={branchId?.message}
        />

        <SelectFromOptions
          register={register}
          options={[
            "Regular Branch Visit",
            "Team work",
            "Meeting/Training",
            "Reporting",
          ]}
          label="Visit Type"
          name="visitType"
          errorMessage={visitType?.message}
        />
        <SelectFromOptions
          register={register}
          options={["Yes", "No"]}
          label="Stay Overnight"
          name="stayOvernight"
          errorMessage={stayOvernight?.message}
        />
        <DataListFromDb
          register={register}
          label="Select Branch Manager"
          path={`/employees/SelectByBranch/${
            branchSelectId === "" ? 0 : branchSelectId
          }`}
          name="pinName"
          errorMessage={pinName?.message}
        />

        <SelectSupervisorFromDb
          control={control}
          label="Select Supervisor"
          path="/employees/selectManager"
          name="managerPin"
          errorMessage={managerPin?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default VisitInfoForm;
