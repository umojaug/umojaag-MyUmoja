import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import SaveButton from "../../../components/button/SaveButton";
import moment from "moment";
import DatePicker from "../../../components/DatePicker";

const schema = yup.object({
  forexId: yup.string().max(50),
  forexName: yup.string().required("Required.").max(50),
  forexRate: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Number Required"),
  workDate: yup.date().required("Required."),
});

const ForexForm = ({ defaultValues, action, btnText, path, returnPath }) => {
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
  const { forexName, forexRate, workDate } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("forexId", formData.forexId);
    data.append("forexName", formData.forexName);
    data.append("forexRate", formData.forexRate);
    data.append(
      "workDate",
      moment.utc(formData.workDate).local().format("YYYY-MM-DD")
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
      <input type="hidden" {...register("forexId")} />
      <div className="form-col">
        <Input
          name="forexName"
          label="Forex Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={forexName?.message}
        />
        <Input
          name="forexRate"
          label="Rate"
          register={register}
          errorMessage={forexRate?.message}
        />
        <Controller
          control={control}
          name="workDate"
          render={({ field }) => (
            <DatePicker
              label="Date"
              field={field}
              errorMessage={workDate?.message}
              isRow={false}
            />
          )}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default ForexForm;
