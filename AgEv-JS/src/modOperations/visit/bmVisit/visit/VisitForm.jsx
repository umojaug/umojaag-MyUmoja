import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import DatePicker from "../../../../components/DatePicker";
import { usePostData } from "../../../../hooks/dataApi";
import SaveButton from "../../../../components/button/SaveButton";
import {
  SelectFromDb,
  SelectFromOptions,
} from "../../../../components/SelectList";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  bmVisitId: yup.string().max(50),
  visitDate: yup.date().required("Required"),
  branchId: yup.string().required("Required.").max(50),
  visitType: yup.string().required("Required.").max(50),
  stayOvernight: yup.string().required("Required.").max(50),
  managerId: yup.string().required("Required.").max(50),
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
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { visitDate, branchId, visitType, stayOvernight, managerId } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var tmpData = new FormData();
    tmpData.append("bmVisitId", formData.bmVisitId);
    tmpData.append(
      "visitDate",
      moment.utc(formData.visitDate).local().format("YYYY-MM-DD")
    );
    tmpData.append("branchId", formData.branchId);
    tmpData.append("visitType", formData.visitType);
    tmpData.append("stayOvernight", formData.stayOvernight);
    tmpData.append("managerId", formData.managerId);
    try {
      const { data, status } = await mutateAsync({
        path: path,
        formData: tmpData,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        navigate(`/ops/bm/visit/preview/${data}`);
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
      <input type="hidden" {...register("bmVisitId")} />
      <div className="form-col">
        <Controller
          control={control}
          name="visitDate"
          render={({ field }) => (
            <DatePicker
              label="Visit Date"
              field={field}
              errorMessage={visitDate?.message}
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
        <SelectFromDb
          control={control}
          label="Select Manager"
          path="/employees/selectmanager"
          name="managerId"
          errorMessage={managerId?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default VisitInfoForm;
