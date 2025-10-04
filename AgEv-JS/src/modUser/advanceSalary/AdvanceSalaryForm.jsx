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
  advanceAmount: yup.number().required("Required"),
  purposeOfAdvance: yup.string().required("Required").max(250),
  neededAdvanceDate: yup.date().required("Required"),
  pinName: yup.string().required("Required").max(50),
});

const AdvanceSalaryForm = ({
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
  const { advanceAmount, purposeOfAdvance, neededAdvanceDate, pinName } =
    errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("advanceAmount", formData.advanceAmount);
    data.append("purposeOfAdvance", formData.purposeOfAdvance);
    data.append(
      "neededAdvanceDate",
      moment.utc(formData.neededAdvanceDate).local().format("YYYY-MM-DD")
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
        <Input
          name="advanceAmount"
          label="Advance Salary Amount"
          type="text"
          register={register}
          errorMessage={advanceAmount?.message}
        />
        <Input
          name="purposeOfAdvance"
          label="Purpose Of Cash Advance"
          type="text"
          register={register}
          errorMessage={purposeOfAdvance?.message}
        />
        <Controller
          control={control}
          name="neededAdvanceDate"
          render={({ field }) => (
            <DatePicker
              label="Date of salary advance is needed"
              field={field}
              errorMessage={neededAdvanceDate?.message}
              isRow={false}
            />
          )}
        />

        <DataListFromDb
          register={register}
          label="Request for Approval"
          path="/myleave/select"
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

export default AdvanceSalaryForm;
