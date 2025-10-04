import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../../hooks/dataApi";
import Input from "../../../../../components/Input";
import SaveButton from "../../../../../components/button/SaveButton";

const schema = yup.object({
  opsAmODFollowUpId: yup.number(),
  amVisitId: yup.string().required("Required.").max(50),
  groupName: yup.string().required("Required.").max(50),
  borrowerName: yup.string().required("Required.").max(50),
  realisedAmount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  remarks: yup.string().max(250),
});

const OdFollowUpForm = ({ defaultValues, action, btnText, path }) => {
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
  const { groupName, borrowerName, realisedAmount, remarks } = errors;

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
      <input type="hidden" {...register("amVisitId")} />
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
          name="realisedAmount"
          label="Realised Amount"
          type="text"
          register={register}
          errorMessage={realisedAmount?.message}
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

export default OdFollowUpForm;
