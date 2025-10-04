import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import { usePostData } from "../../hooks/dataApi";
import { SelectFromDb } from "../../components/SelectList";
import DatePicker from "../../components/DatePicker";

const schema = yup.object({
  recruitmentId: yup.string().max(50),
  jobTitle: yup.string().required("Required.").max(50),
  departmentId: yup.string().required("Required.").max(50),
  startDate: yup.date().required("Required."),
  staffTypeId: yup.string().required("Required.").max(50),
  managerId: yup.string().required("Required.").max(50),
});

const RecruitmentRequestForm = ({
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
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const { jobTitle, departmentId, startDate, staffTypeId, managerId } = errors;

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
      <input type="hidden" {...register("recruitmentId")} />

      <div className="form-col">
        <Input
          name="jobTitle"
          label="Job Title"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={jobTitle?.message}
        />

        <SelectFromDb
          control={control}
          label="Department Name"
          path="/departments/select"
          name="departmentId"
          errorMessage={departmentId?.message}
        />

        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <DatePicker
              label="Intended Start Date"
              field={field}
              errorMessage={startDate?.message}
              isRow={false}
            />
          )}
        />

        <SelectFromDb
          control={control}
          label="Staff Types"
          path="/StaffTypes/select"
          name="staffTypeId"
          errorMessage={staffTypeId?.message}
        />
        <SelectFromDb
          control={control}
          label="Manager Select"
          path="/employees/select"
          name="managerId"
          errorMessage={managerId?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default RecruitmentRequestForm;
