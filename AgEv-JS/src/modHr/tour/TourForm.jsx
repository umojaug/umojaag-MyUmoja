import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SaveButton from "../../components/button/SaveButton";
import DatePicker from "../../components/DatePicker";
import moment from "moment";
import TextArea from "../../components/TextArea";
import { SelectFromDb } from "../../components/SelectList";

const schema = yup.object({
  employeePIN: yup.string().required("Required."),
  tourType: yup.string().required("Required."),
  fromDate: yup.date().required("Required."),
  tillDate: yup.date().required("Required."),
  applicationDate: yup.date().required("Required."),
  workDate: yup.date().required("Required."),
  particulars: yup.string().required("Required.").max(4000),
});

const TourForm = ({ defaultValues, action, btnText, path, returnPath }) => {
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
    tourType,
    fromDate,
    tillDate,
    workDate,
    applicationDate,
    particulars,
    employeePIN,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("employeeName", formData.employeeName);
    data.append("employeePIN", formData.employeePIN);
    data.append("tourType", formData.tourType);
    data.append("particulars", formData.particulars);
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
    data.append(
      "applicationDate",
      moment.utc(formData.applicationDate).local().format("YYYY-MM-DD")
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
      <div className="form-col">
        <SelectFromDb
          register={register}
          label="employee PIN"
          path="/employeePIN/select"
          name="employeePIN"
          errorMessage={employeePIN?.message}
        />
        <SelectFromDb
          register={register}
          label="Tour Type"
          path="/tourType/select"
          name="tourType"
          errorMessage={tourType?.message}
        />

        <Controller
          control={control}
          name="fromDate"
          render={({ field }) => (
            <DatePicker
              label="From Date"
              field={field}
              isRow={false}
              errorMessage={fromDate?.message}
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
              isRow={false}
              errorMessage={tillDate?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="applicationDate"
          render={({ field }) => (
            <DatePicker
              label="Application Date"
              field={field}
              isRow={false}
              errorMessage={applicationDate?.message}
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
              isRow={false}
              errorMessage={workDate?.message}
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

export default TourForm;
