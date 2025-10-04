import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import SaveButton from "../../../components/button/SaveButton";

const schema = yup.object({
  leaveId: yup.string().max(50),
  leaveName: yup.string().required("Required.").max(50),
  shortCode: yup.string().required("Required.").max(4),
  yearlyLeave: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Numbers required"),
});

const LeaveForm = ({ defaultValues, action, btnText, path, returnPath }) => {
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
  const { leaveName, shortCode, yearlyLeave } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    // var data = new FormData();
    // data.append("leaveName", formData.leaveName);
    // data.append("shortCode", formData.shortCode);
    // data.append("yearlyLeave", formData.yearlyLeave);
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
      <input type="hidden" {...register("leaveId")} />
      <div className="form-col">
        <Input
          name="leaveName"
          label="Leave Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={leaveName?.message}
        />
        <Input
          name="shortCode"
          label="Short Code"
          type="text"
          register={register}
          errorMessage={shortCode?.message}
        />
        <Input
          name="yearlyLeave"
          label="Yearly Leave"
          type="text"
          register={register}
          errorMessage={yearlyLeave?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default LeaveForm;
