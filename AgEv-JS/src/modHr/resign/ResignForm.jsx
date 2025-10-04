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
import { DataListFromDb, SelectFromDb } from "../../components/SelectList";

const schema = yup.object({
  pinName: yup.string().required("Required").max(50),
  resignReasonId: yup.string().required("Required").max(50),
  particulars: yup.string().required("Required").max(4000),
  resignDate: yup.date().required("Required"),
});

function ResignForm({ path, returnPath }) {
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
    defaultValues: {
      pinName: "",
      resignReasonId: "",
      particulars: "",
      resignDate: new Date(),
    },
    resolver: yupResolver(schema),
  });
  const { pinName, resignReasonId, particulars, resignDate } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("pinName", formData.pinName);
    data.append("resignReasonId", formData.resignReasonId);
    data.append("particulars", formData.particulars);
    data.append(
      "resignDate",
      moment.utc(formData.resignDate).local().format("YYYY-MM-DD")
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

        <SelectFromDb
          control={control}
          label="Resign Reason"
          path="/resignreasons/select"
          name="resignReasonId"
          errorMessage={resignReasonId?.message}
        />
        <Controller
          control={control}
          name="resignDate"
          render={({ field }) => (
            <DatePicker
              label="Resign Date"
              field={field}
              errorMessage={resignDate?.message}
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
        <SaveButton btnText="Save" disabled={submitting} />
      </div>
    </form>
  );
}

export default ResignForm;
