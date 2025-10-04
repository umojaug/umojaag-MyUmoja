import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import { SelectFromDb } from "../../../components/SelectList";
import SaveButton from "../../../components/button/SaveButton";
import DatePicker from "../../../components/DatePicker";

const schema = yup.object({
  regionId: yup.string().max(50),
  divisionId: yup.string().max(50),
  regionName: yup.string().required("Required.").max(50),
  startDate: yup.date().required("Required"),
});

const RegionForm = ({ defaultValues, action, btnText, path, returnPath }) => {
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
  const { divisionId, regionName, startDate } = errors;

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
      <input type="hidden" {...register("regionId")} />
      <SelectFromDb
        control={control}
        label="Division"
        path="/divisions/select"
        name="divisionId"
        errorMessage={divisionId?.message}
      />
      <div className="form-col">
        <Input
          name="regionName"
          label="Region Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={regionName?.message}
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

export default RegionForm;
