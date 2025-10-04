import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import moment from "moment";
import DatePicker from "../../components/DatePicker";
import { DataListFromDb } from "../../components/SelectList";

const schema = yup.object({
  timeLogId: yup.string().max(50),
  taskHour: yup.number().required("Required"),
  taskName: yup.string().required("Required").max(50),
  // status: yup.string().required("Required").max(50),
  taskDate: yup.date().required("Required"),
  pinName: yup.string().required("Required").max(50),
});

const MyTimeLogForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { taskName, taskHour, taskDate, pinName } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("timeLogId", formData.timeLogId);
    data.append("taskName", formData.taskName);
    data.append("taskHour", formData.taskHour);
    // data.append("status", formData.status);
    data.append(
      "taskDate",
      moment.utc(formData.taskDate).local().format("YYYY-MM-DD")
    );

    data.append("pinName", formData.pinName);
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
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
      <input type="hidden" {...register("timeLogId")} />
      <div className="form-col">
        <Input
          name="taskName"
          label="Task Name"
          type="text"
          register={register}
          errorMessage={taskName?.message}
        />
        <Input
          name="taskHour"
          label="Task Hour"
          type="text"
          register={register}
          errorMessage={taskHour?.message}
        />
        {/* <Input
          name="advanceStatus"
          label="Status"
          type="text"
          register={register}
          errorMessage={advanceStatus?.message}
        /> */}
        <Controller
          control={control}
          name="taskDate"
          render={({ field }) => (
            <DatePicker
              label="Task Date"
              field={field}
              errorMessage={taskDate?.message}
              isRow={false}
            />
          )}
        />

        <DataListFromDb
          register={register}
          label="Request for Approval"
          path="/mytimelog/select"
          name="pinName"
          errorMessage={pinName?.message}
        />
      </div>
      <div className="from-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default MyTimeLogForm;
