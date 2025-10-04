import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../../../components/Input";
import SaveButton from "../../../../../components/button/SaveButton";

const schema = yup.object({
  OpsBmDailyReportId: yup.number(),
  bmVisitId: yup.string().required("Required.").max(50),
  admissionNumber: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  disbursementNumber: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  disbursementAmount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  securityNumber: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  securityAmount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  overdueNumber: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  overdueAmount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  borrowerPositionNumber: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  borrowerPositionAmount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
});

const DailyReportForm = ({
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
    admissionNumber,
    disbursementNumber,
    disbursementAmount,
    securityNumber,
    securityAmount,
    overdueNumber,
    overdueAmount,
    borrowerPositionNumber,
    borrowerPositionAmount,
  } = errors;

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
      <input type="hidden" {...register("opsBmDailyReportId")} />
      <input type="hidden" {...register("bmVisitId")} />
      <div className="form-col">
        <Input
          name="admissionNumber"
          label="Admission Number"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={admissionNumber?.message}
        />
        <Input
          name="disbursementNumber"
          label="Disbursement Number"
          type="text"
          register={register}
          errorMessage={disbursementNumber?.message}
        />
        <Input
          name="disbursementAmount"
          label="Disbursement Amount"
          type="text"
          register={register}
          errorMessage={disbursementAmount?.message}
        />
        <Input
          name="securityNumber"
          label="Security Number"
          type="text"
          register={register}
          errorMessage={securityNumber?.message}
        />
        <Input
          name="securityAmount"
          label="Security Amount"
          type="text"
          register={register}
          errorMessage={securityAmount?.message}
        />
        <Input
          name="overdueNumber"
          label="Overdue Number"
          type="text"
          register={register}
          errorMessage={overdueNumber?.message}
        />
        <Input
          name="overdueAmount"
          label="Overdue Amount"
          type="text"
          register={register}
          errorMessage={overdueAmount?.message}
        />
        <Input
          name="borrowerPositionNumber"
          label="Borrower Position Number"
          type="text"
          register={register}
          errorMessage={borrowerPositionNumber?.message}
        />
        <Input
          name="borrowerPositionAmount"
          label="Borrower Position Amount"
          type="text"
          register={register}
          errorMessage={borrowerPositionAmount?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default DailyReportForm;
