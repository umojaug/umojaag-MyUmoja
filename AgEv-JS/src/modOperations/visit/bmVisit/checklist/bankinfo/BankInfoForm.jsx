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
  opsBmBankInfoId: yup.number(),
  bmVisitId: yup.string().required("Required.").max(50),
  fundReceivedBranch: yup.string().required("Required.").max(50),
  fundReceivedAmount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  fundTransferBranch: yup.string().required("Required.").max(50),
  fundTransferAmount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  bankWithdraw: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  bankDeposit: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  bankBalance: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
});

const BankInfoForm = ({ defaultValues, action, btnText, path, returnPath }) => {
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
    fundReceivedBranch,
    fundReceivedAmount,
    fundTransferBranch,
    fundTransferAmount,
    bankWithdraw,
    bankDeposit,
    bankBalance,
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
      <input type="hidden" {...register("opsBmBankInfoId")} />
      <input type="hidden" {...register("bmVisitId")} />
      <div className="form-col">
        <Input
          name="fundReceivedBranch"
          label="Fund Received Branch"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={fundReceivedBranch?.message}
        />

        <Input
          name="fundReceivedAmount"
          label="Fund Received Amount"
          type="text"
          register={register}
          errorMessage={fundReceivedAmount?.message}
        />
        <Input
          name="fundTransferBranch"
          label="Fund Transfer Branch"
          type="text"
          register={register}
          errorMessage={fundTransferBranch?.message}
        />
        <Input
          name="fundTransferAmount"
          label="Fund Transfer Amount"
          type="text"
          register={register}
          errorMessage={fundTransferAmount?.message}
        />
        <Input
          name="bankWithdraw"
          label="Bank Withdraw"
          type="text"
          register={register}
          errorMessage={bankWithdraw?.message}
        />
        <Input
          name="bankDeposit"
          label="Bank Deposit"
          type="text"
          register={register}
          errorMessage={bankDeposit?.message}
        />
        <Input
          name="bankBalance"
          label="Bank Balance"
          type="text"
          register={register}
          errorMessage={bankBalance?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default BankInfoForm;
