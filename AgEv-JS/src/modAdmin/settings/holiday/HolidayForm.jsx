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
  holidayId: yup.string().max(50),
  holidayName: yup.string().required("Required."),
  fromDate: yup.date().required("Required."),
  tillDate: yup.date().required("Required."),
});

const HolidayForm = ({ defaultValues, action, btnText, path, returnPath }) => {
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
  const { holidayName, fromDate, tillDate } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("holidayId", formData.holidayId);
    data.append("holidayName", formData.holidayName);
    data.append(
      "fromDate",
      moment.utc(formData.fromDate).local().format("YYYY-MM-DD")
    );
    data.append(
      "tillDate",
      moment.utc(formData.tillDate).local().format("YYYY-MM-DD")
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
      <input type="hidden" {...register("holidayId")} />
      <div className="form-col">
        <Input
          name="holidayName"
          label="Holiday Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={holidayName?.message}
        />
        <Controller
          control={control}
          name="fromDate"
          render={({ field }) => (
            <DatePicker
              label="From Date"
              field={field}
              errorMessage={fromDate?.message}
              isRow={false}
            />
          )}
        />
        <Controller
          control={control}
          name="tillDate"
          render={({ field }) => (
            <DatePicker
              label="Till Date"
              field={field}
              errorMessage={tillDate?.message}
              isRow={false}
            />
          )}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default HolidayForm;
