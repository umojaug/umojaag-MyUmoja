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
  opsAmBranchPerformanceId: yup.number(),
  amVisitId: yup.string().required("Required.").max(50),
  loName: yup.string().required("Required.").max(50),
  numberOfGroup: yup.string().required("Required.").max(50),
  overdueNumber: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  overdueAmount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  numberOfBorrower: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  numberOfAdmission: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  securityReturn: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  remarks: yup.string().required("Required.").max(50),
});

const AmBranchPerformanceForm = ({
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
    loName,
    numberOfGroup,
    overdueNumber,
    overdueAmount,
    numberOfBorrower,
    numberOfAdmission,
    securityReturn,
    remarks,
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
      <input type="hidden" {...register("opsAmBranchPerformanceId")} />
      <input type="hidden" {...register("amVisitId")} />
      <div className="form-col">
        <Input
          name="loName"
          label="LO Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={loName?.message}
        />
        <Input
          name="numberOfGroup"
          label="Number of Group"
          type="text"
          register={register}
          errorMessage={numberOfGroup?.message}
        />
        <Input
          name="numberOfBorrower"
          label="Number of Borrower"
          type="text"
          register={register}
          errorMessage={numberOfBorrower?.message}
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
          name="numberOfAdmission"
          label="Number of Admission"
          type="text"
          register={register}
          errorMessage={numberOfAdmission?.message}
        />
        <Input
          name="securityReturn"
          label="Security Number"
          type="text"
          register={register}
          errorMessage={securityReturn?.message}
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

export default AmBranchPerformanceForm;
