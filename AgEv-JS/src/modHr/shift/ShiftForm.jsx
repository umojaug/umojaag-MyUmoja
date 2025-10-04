import React, { useState } from "react";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import DatePicker from "../../components/DatePicker";
import TextArea from "../../components/TextArea";
import { SelectFromDb } from "../../components/SelectList";

const schema = yup.object({
  employeePIN: yup.string().required("Required"),
  shiftName: yup.string().required("Required."),
  fromDate: yup.string().required("Required."),
  tillDate: yup.string().required("Required."),
  workDate: yup.string().required("Required."),
  particulars: yup.string().required("Required.").max(4000),
});

const ShiftForm = ({ defaultValues, action, btnText, path, returnPath }) => {
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
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

  const { shiftName, fromDate, tillDate, workDate, particulars, employeePIN } =
    errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("shiftName", formData.shiftName);
    data.append(
      "fromDate",
      moment.utc(formData.fromDate).local().format("YYYY-MM-DD")
    );
    data.append(
      "tillDate",
      moment.utc(formData.tillDate).local().format("YYYY-MM-DD")
    );
    data.append(
      "workDate",
      moment.utc(formData.workDate).local().format("YYYY-MM-DD")
    );
    data.append("particulars", formData.particulars);
    data.append("employeePIN", formData.employeePIN);

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
      <div className="form-col">
        <SelectFromDb
          register={register}
          label="Employee PIN List"
          path="/employeePIN/select"
          name="employeePIN"
          errorMessage={employeePIN?.message}
        />
        <Input
          name="shiftName"
          label="Shift Name"
          type="text"
          register={register}
          errorMessage={shiftName?.message}
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
        <Controller
          control={control}
          name="workDate"
          render={({ field }) => (
            <DatePicker
              label="Work Date"
              field={field}
              errorMessage={workDate?.message}
              isRow={false}
            />
          )}
        />
        <TextArea
          name="particulars"
          label="Particulars"
          type="text"
          register={register}
          errorMessage={particulars?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default ShiftForm;
