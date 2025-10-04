import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../../hooks/dataApi";
import Input from "../../../../../components/Input";
import SaveButton from "../../../../../components/button/SaveButton";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  opsRmCashAtHandId: yup.number(),
  rmVisitId: yup.string().required("Required.").max(50),
  cashbookAmount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  physicalAmount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  remarks: yup.string().max(50),
});

const CashAtHandForm = ({
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
  const { cashbookAmount, physicalAmount, remarks } = errors;

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
        navigate(returnPath);
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
      <input type="hidden" {...register("opsRmCashAtHandId")} />
      <input type="hidden" {...register("rmVisitId")} />
      <div className="form-col">
        <Input
          name="cashbookAmount"
          label="Cashbook Amount"
          type="text"
          register={register}
          errorMessage={cashbookAmount?.message}
        />
        <Input
          name="physicalAmount"
          label="Physical Amount"
          type="text"
          register={register}
          errorMessage={physicalAmount?.message}
        />
        <Input
          name="remarks"
          label="Remarks"
          type="text"
          register={register}
          errorMessage={remarks?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default CashAtHandForm;
