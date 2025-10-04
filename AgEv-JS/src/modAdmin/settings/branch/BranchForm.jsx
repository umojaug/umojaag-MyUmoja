import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import SaveButton from "../../../components/button/SaveButton";
import { SelectFromDb } from "../../../components/SelectList";
import moment from "moment";
import DatePicker from "../../../components/DatePicker";

const schema = yup.object({
  branchId: yup.string().max(50),
  areaId: yup.string().max(50),
  branchName: yup.string().required("Required.").max(50),
  startDate: yup.date().required("Required"),
});

const BranchForm = ({ defaultValues, action, btnText, path, returnPath }) => {
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
  const { areaId, branchName, startDate } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("areaId", formData.areaId);
    data.append("branchId", formData.branchId);
    data.append("branchName", formData.branchName);
    data.append(
      "startDate",
      moment.utc(formData.startDate).local().format("YYYY-MM-DD")
    );
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
      <input type="hidden" {...register("branchId")} />
      <div className="form-col">
        <SelectFromDb
          control={control}
          label="Area"
          path="/areas/select"
          name="areaId"
          errorMessage={areaId?.message}
        />
        <Input
          name="branchName"
          label="Branch Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={branchName?.message}
        />
        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <DatePicker
              label="Start Date"
              field={field}
              errorMessage={startDate?.message}
            />
          )}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default BranchForm;
