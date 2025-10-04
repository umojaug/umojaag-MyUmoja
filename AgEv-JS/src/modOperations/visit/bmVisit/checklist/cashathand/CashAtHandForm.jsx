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
  opsBmCashAtHandId: yup.number(),
  bmVisitId: yup.string().required("Required.").max(50),
  openingBalance: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  closingBalance: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  aboveCeilingReason: yup.string().required("Required.").max(50),
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
  const { openingBalance, closingBalance, aboveCeilingReason } = errors;

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
      <input type="hidden" {...register("bmVisitId")} />
      <div className="form-col">
        <Input
          name="openingBalance"
          label="Opening Balance"
          type="text"
          register={register}
          errorMessage={openingBalance?.message}
        />
        <Input
          name="closingBalance"
          label="Closing Balance"
          type="text"
          register={register}
          errorMessage={closingBalance?.message}
        />
        <Input
          name="aboveCeilingReason"
          label="Above ceiling (200,000) reason"
          type="text"
          register={register}
          errorMessage={aboveCeilingReason?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default CashAtHandForm;
