import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../../hooks/dataApi";
import Input from "../../../../../components/Input";
import SaveButton from "../../../../../components/button/SaveButton";
import { useNavigate } from "react-router-dom";
import TextArea from "../../../../../components/TextArea";

const schema = yup.object({
  obdBorrowerId: yup.number(),
  allVisitId: yup.string(),
  groupName: yup.string().required("Required.").max(50),
  borrowerName: yup.string().required("Required.").max(50),
  overdueAmount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  loanBalance: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  collectedAmount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  takenAction: yup.string().required("Required.").max(500),
});

const BorrowerVisitForm = ({
  defaultValues,
  returnPath,
  action,
  btnText,
  path,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const navigate = useNavigate();
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
  const {
    groupName,
    borrowerName,
    overdueAmount,
    loanBalance,
    collectedAmount,
    takenAction,
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
      <input type="hidden" {...register("obdBorrowerId")} />
      <input type="hidden" {...register("allVisitId")} />
      <div className="form-col">
        <Input
          name="groupName"
          label="Group Name"
          type="text"
          register={register}
          errorMessage={groupName?.message}
        />
        <Input
          name="borrowerName"
          label="Borrower's Name"
          type="text"
          register={register}
          errorMessage={borrowerName?.message}
        />
        <Input
          name="overdueAmount"
          label="Overdue Amount"
          type="text"
          register={register}
          errorMessage={overdueAmount?.message}
        />
        <Input
          name="loanBalance"
          label="Loan Balance"
          type="text"
          register={register}
          errorMessage={loanBalance?.message}
        />
        <Input
          name="collectedAmount"
          label="Amount Collected"
          type="text"
          register={register}
          errorMessage={collectedAmount?.message}
        />

        <TextArea
          control={control}
          name="takenAction"
          label="Taken Actions"
          areaHeight="h-14"
          errorMessage={takenAction?.message}
          isAutoFocus={true}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default BorrowerVisitForm;
