import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SaveButton from "../../../../components/button/SaveButton";
import { DataListFromDb } from "../../../../components/SelectList";
import Input from "../../../../components/Input";

const schema = yup.object({
  pinName: yup.string().required("Required.").max(50),
  annualLeave: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  annualLeaveExpt: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  compassionateLeave: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  maternityLeave: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  paternityLeave: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  sickLeave: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
});

const LeaveBalanceForm = ({
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
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    pinName,
    annualLeave,
    annualLeaveExpt,
    compassionateLeave,
    maternityLeave,
    paternityLeave,
    sickLeave,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("pinName", formData.pinName);
    data.append("annualLeave", formData.annualLeave);
    data.append("annualLeaveExpt", formData.annualLeaveExpt);
    data.append("compassionateLeave", formData.compassionateLeave);
    data.append("maternityLeave", formData.maternityLeave);
    data.append("paternityLeave", formData.paternityLeave);
    data.append("sickLeave", formData.sickLeave);
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
      <input type="hidden" {...register("leaveEmpId")} />
      <div className="form-col">
        <DataListFromDb
          register={register}
          label="Employee"
          path="/employees/select"
          name="pinName"
          errorMessage={pinName?.message}
        />
        <Input
          name="annualLeave"
          label="Annual Leave"
          type="text"
          register={register}
          errorMessage={annualLeave?.message}
        />
        <Input
          name="annualLeaveExpt"
          label="Annual Leave Expt"
          type="text"
          register={register}
          errorMessage={annualLeaveExpt?.message}
        />
        <Input
          name="compassionateLeave"
          label="Compassionate Leave"
          type="text"
          register={register}
          errorMessage={compassionateLeave?.message}
        />
        <Input
          name="maternityLeave"
          label="Maternity Leave"
          type="text"
          register={register}
          errorMessage={maternityLeave?.message}
        />
        <Input
          name="paternityLeave"
          label="Paternity Leave"
          type="text"
          register={register}
          errorMessage={paternityLeave?.message}
        />
        <Input
          name="sickLeave"
          label="Sick Leave"
          type="text"
          register={register}
          errorMessage={sickLeave?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default LeaveBalanceForm;
