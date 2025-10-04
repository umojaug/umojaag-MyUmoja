import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../../hooks/dataApi";
import Input from "../../../../../components/Input";
import { SelectFromOptions } from "../../../../../components/SelectList";
import SaveButton from "../../../../../components/button/SaveButton";

const schema = yup.object({
  opsBmLoanVerificationId: yup.number(),
  bmVisitId: yup.string().required("Required.").max(50),
  typeOfLoan: yup.string().required("Required.").max(50),
  groupName: yup.string().required("Required.").max(50),
  borrowerName: yup.string().required("Required.").max(50),
});

const LoanVerificationForm = ({ defaultValues, action, btnText, path }) => {
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
  const { typeOfLoan, groupName, borrowerName } = errors;

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
      <input type="hidden" {...register("bmVisitId")} />
      <div className="form-col">
        <SelectFromOptions
          register={register}
          options={["New", "Repeat"]}
          bel="Type Of Loan"
          name="typeOfLoan"
          errorMessage={typeOfLoan?.message}
        />
        {/* <Input
          name="typeOfLoan"
          label="Type Of Loan"
          type="text"
          register={register}
          errorMessage={typeOfLoan?.message}
        /> */}
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
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default LoanVerificationForm;
