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
import { AiOutlineFile } from "react-icons/ai";
import InputFile from "../../components/InputFile";

const schema = yup.object({
  leaveId: yup.string().required("Required").max(50),
  fromDate: yup.date().required("Required"),
  tillDate: yup.date().required("Required"),
  particulars: yup.string().required("Required").max(4000),
  pinName: yup.string().required("Required").max(50),
});

function LeaveForm({ defaultValues, action, btnText, path, returnPath }) {
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { leaveId, fromDate, tillDate, particulars, pinName } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("leaveId", formData.leaveId);
    data.append(
      "fromDate",
      moment.utc(formData.fromDate).local().format("YYYY-MM-DD")
    );
    data.append(
      "tillDate",
      moment.utc(formData.tillDate).local().format("YYYY-MM-DD")
    );
    data.append("particulars", formData.particulars);
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
          control={control}
          label="Leave Type"
          path="/leaves/select"
          name="leaveId"
          errorMessage={leaveId?.message}
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
        <DataListFromDb
          register={register}
          label="Request for Approval"
          path="/myleave/select"
          name="pinName"
          errorMessage={pinName?.message}
        />

        <div className="flex w-full">
          <InputFile
            name="file"
            register={register}
            action={setFile}
            errorMessage={file?.message}
          />
          <div className="text-xs ml-2">
            {defaultValues.fileUrl !== "" ? (
              <a href={defaultValues.fileUrl} className="btn-success w-12 h-10">
                <AiOutlineFile size={24} />
              </a>
            ) : (
              <></>
            )}
            {/* <label>{evidences}</label> */}
          </div>
        </div>
      </div>
      <div className="from-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
}

export default LeaveForm;
