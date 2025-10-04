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
import TimePicker from "../../../components/TimePicker";
import ErrorMessage from "../../../components/Error/ErrorMessage";

const schema = yup.object({
  shiftId: yup.string().max(50),
  shiftName: yup.string().required("Required.").max(50),
  shiftIn: yup.date().required("Required."),
  shiftOut: yup.date().required("Required."),
  shiftAbsent: yup.date().required("Required."),
  shiftLate: yup.date().required("Required."),
  shiftEarly: yup.date().required("Required."),
  shiftLunchFrom: yup.date().required("Required."),
  shiftLunchTill: yup.date().required("Required."),
  shiftLastPunch: yup.date().required("Required"),
  defaultShift: yup.bool(),
});

const ShiftForm = ({ defaultValues, action, btnText, path, returnPath }) => {
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
  const {
    shiftName,
    shiftIn,
    shiftOut,
    shiftAbsent,
    shiftLate,
    shiftEarly,
    shiftLunchFrom,
    shiftLunchTill,
    shiftLastPunch,
    defaultShift,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("shiftName", formData.shiftName);
    data.append("defaultShift", formData.defaultShift);
    data.append(
      "shiftIn",
      moment.utc(formData.shiftIn).local().format("HH:mm:ss")
    );
    data.append(
      "shiftOut",
      moment.utc(formData.shiftOut).local().format("HH:mm:ss")
    );
    data.append(
      "shiftAbsent",
      moment.utc(formData.shiftAbsent).local().format("HH:mm:ss")
    );
    data.append(
      "shiftLate",
      moment.utc(formData.shiftLate).local().format("HH:mm:ss")
    );
    data.append(
      "shiftEarly",
      moment.utc(formData.shiftEarly).local().format("HH:mm:ss")
    );
    data.append(
      "shiftLunchFrom",
      moment.utc(formData.shiftLunchFrom).local().format("HH:mm:ss")
    );
    data.append(
      "shiftLunchTill",
      moment.utc(formData.shiftLunchTill).local().format("HH:mm:ss")
    );
    data.append(
      "shiftLastPunch",
      moment.utc(formData.shiftLastPunch).local().format("HH:mm:ss")
    );
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
      <input type="hidden" {...register("shiftId")} />
      <div className="form-col">
        <Input
          name="shiftName"
          label="Shift Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={shiftName?.message}
        />
        <Controller
          control={control}
          name="shiftIn"
          render={({ field }) => (
            <TimePicker
              label="In"
              field={field}
              errorMessage={shiftIn?.message}
              isRow={false}
            />
          )}
        />
        <Controller
          control={control}
          name="shiftOut"
          render={({ field }) => (
            <TimePicker
              label="Out"
              field={field}
              errorMessage={shiftOut?.message}
              isRow={false}
            />
          )}
        />
        <Controller
          control={control}
          name="shiftAbsent"
          render={({ field }) => (
            <TimePicker
              label="Absent"
              field={field}
              errorMessage={shiftAbsent?.message}
              isRow={false}
            />
          )}
        />
        <Controller
          control={control}
          name="shiftLate"
          render={({ field }) => (
            <TimePicker
              label="Late"
              field={field}
              errorMessage={shiftLate?.message}
              isRow={false}
            />
          )}
        />
        <Controller
          control={control}
          name="shiftEarly"
          render={({ field }) => (
            <TimePicker
              label="Early Out"
              field={field}
              errorMessage={shiftEarly?.message}
              isRow={false}
            />
          )}
        />
        <Controller
          control={control}
          name="shiftLunchFrom"
          render={({ field }) => (
            <TimePicker
              label="Lunch From"
              field={field}
              errorMessage={shiftLunchFrom?.message}
              isRow={false}
            />
          )}
        />
        <Controller
          control={control}
          name="shiftLunchTill"
          render={({ field }) => (
            <TimePicker
              label="Lunch Till"
              field={field}
              errorMessage={shiftLunchTill?.message}
              isRow={false}
            />
          )}
        />
        <Controller
          control={control}
          name="shiftLastPunch"
          render={({ field }) => (
            <TimePicker
              label="Last Punch"
              field={field}
              errorMessage={shiftLastPunch?.message}
              isRow={false}
            />
          )}
        />
        <div className="form-row w-full">
          <label>Default Shift</label>
          <select className="form-control" {...register("defaultShift")}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <ErrorMessage message={defaultShift?.message} />
        </div>
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default ShiftForm;
