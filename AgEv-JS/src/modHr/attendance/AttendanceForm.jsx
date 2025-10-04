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
import { DataListFromDb, SelectFromOptions } from "../../components/SelectList";
import { selectOptions } from "../../data/selectOptions";

const schema = yup.object({
  pinName: yup.string().required("Required").max(50),
  attenStatus: yup.string().required("Required").max(50),
  fromDate: yup.date().required("Required"),
  tillDate: yup.date().required("Required"),
  particulars: yup.string().required("Required").max(4000),
});

function AttendancesForm({ defaultValues, action, btnText, path, returnPath }) {
  const navigate = useNavigate();
  const { mutateAsync, reset } = usePostData();
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
  const { pinName, attenStatus, fromDate, tillDate, particulars } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("pinName", formData.pinName);
    data.append("attenStatus", formData.attenStatus);
    data.append(
      "fromDate",
      moment.utc(formData.fromDate).local().format("YYYY-MM-DD")
    );
    data.append(
      "tillDate",
      moment.utc(formData.tillDate).local().format("YYYY-MM-DD")
    );
    data.append("particulars", formData.particulars);
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
        <DataListFromDb
          register={register}
          label="Employee"
          path="/employees/select"
          name="pinName"
          errorMessage={pinName?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.attenStatus}
          label="Status"
          name="attenStatus"
          errorMessage={attenStatus?.message}
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
        <Input
          name="particulars"
          label="Particulars"
          type="text"
          register={register}
          errorMessage={particulars?.message}
        />
      </div>
      <div className="from-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
}

export default AttendancesForm;
