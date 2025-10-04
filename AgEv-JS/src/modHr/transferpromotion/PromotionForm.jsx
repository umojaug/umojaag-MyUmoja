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
import InputFile from "../../components/InputFile";

const schema = yup.object({
  pinName: yup.string().required("Required").max(50),
  designationId: yup.string().required("Required").max(50),
  grossSalaryUsd: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  grossSalary: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  effectiveDate: yup.date().required("Required"),
  particulars: yup.string().required("Required").max(4000),
});

function PromotionForm({ path, returnPath }) {
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pinName: "",
      designationId: "",
      grossSalaryUsd: "0",
      grossSalary: "",
      effectiveDate: new Date(),
      particulars: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    pinName,
    designationId,
    grossSalaryUsd,
    grossSalary,
    effectiveDate,
    particulars,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("pinName", formData.pinName);
    data.append("designationId", formData.designationId);
    data.append("grossSalaryUsd", formData.grossSalaryUsd);
    data.append("grossSalary", formData.grossSalary);
    data.append(
      "effectiveDate",
      moment.utc(formData.effectiveDate).local().format("YYYY-MM-DD")
    );
    data.append("particulars", formData.particulars);
    data.append("file", file);

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
          label="New Designation"
          path="/designations/select"
          name="designationId"
          errorMessage={designationId?.message}
        />
        <Input
          name="grossSalaryUsd"
          label="Gross Salary Usd"
          type="text"
          register={register}
          errorMessage={grossSalaryUsd?.message}
        />
        <Input
          name="grossSalary"
          label="Gross Salary"
          type="text"
          register={register}
          errorMessage={grossSalary?.message}
        />
        <Controller
          control={control}
          name="effectiveDate"
          render={({ field }) => (
            <DatePicker
              label="Effective Date"
              field={field}
              errorMessage={effectiveDate?.message}
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
        <InputFile
          name="file"
          register={register}
          action={setFile}
          errorMessage={file?.message}
        />
      </div>
      <div className="from-cols mt-4">
        <SaveButton btnText="Save" disabled={submitting} />
      </div>
    </form>
  );
}

export default PromotionForm;
