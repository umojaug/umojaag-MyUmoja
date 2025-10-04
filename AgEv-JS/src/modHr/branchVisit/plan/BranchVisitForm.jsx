import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import { SelectAllFromDb } from "../../../components/SelectList";
import DatePicker from "../../../components/DatePicker";
import SaveButton from "../../../components/button/SaveButton";

const schema = yup.object({
  branchId: yup.string().required("Required"),
  visitDate: yup.date().required("Required"),
});

const BranchVisitForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { branchId, visitDate } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
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
      <input type="hidden" {...register("branchVisitId")} />
      <div className="form-col">
        <SelectAllFromDb
          control={control}
          label="Branch"
          path="/branches/select"
          name="branchId"
          errorMessage={branchId?.message}
        />

        <Controller
          control={control}
          name="visitDate"
          render={({ field }) => (
            <DatePicker
              label="Visit Date"
              field={field}
              errorMessage={visitDate?.message}
            />
          )}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default BranchVisitForm;
