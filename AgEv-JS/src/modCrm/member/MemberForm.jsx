import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import { SelectFromOptions } from "../../components/SelectList";

const schema = yup.object({
  memberName: yup.string().required("Required.").max(50),
  totalFamilyMembers: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  contactAddress: yup.string().required("Required.").max(50),
  houseStatus: yup.string().required("Required.").max(50),
  contactNumber: yup.string().required("Required.").max(50),
  typeOfBusiness: yup.string().required("Required.").max(50),
  monthlyIncome: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  othersIncome: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  loanFromOtherMfi: yup.string().required("Required.").max(50),
  expectedLoanAmount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  potentialForLoan: yup.string().required("Required.").max(50),
});

const MemberForm = ({ defaultValues, action, btnText, path, returnPath }) => {
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
    memberName,
    totalFamilyMembers,
    contactAddress,
    houseStatus,
    contactNumber,
    typeOfBusiness,
    monthlyIncome,
    othersIncome,
    loanFromOtherMfi,
    expectedLoanAmount,
    potentialForLoan,
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
      <input type="hidden" {...register("memberId")} />
      <div className="form-col">
        <Input
          name="memberName"
          label="Name of potential member"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={memberName?.message}
        />
        <Input
          name="totalFamilyMembers"
          label="Total family members"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={totalFamilyMembers?.message}
        />
        <Input
          name="contactAddress"
          label="Address"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={contactAddress?.message}
        />
        <SelectFromOptions
          register={register}
          options={["Permanent", "Rented"]}
          label="Permanent/ Rented"
          name="houseStatus"
          errorMessage={houseStatus?.message}
        />
        <Input
          name="contactNumber"
          label="Phone number"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={contactNumber?.message}
        />
        <Input
          name="typeOfBusiness"
          label="Type of business"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={typeOfBusiness?.message}
        />
        <Input
          name="monthlyIncome"
          label="Monthly income from business"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={monthlyIncome?.message}
        />
        <Input
          name="othersIncome"
          label="Others income"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={othersIncome?.message}
        />
        <Input
          name="loanFromOtherMfi"
          label="Loan from other MFI"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={loanFromOtherMfi?.message}
        />
        <Input
          name="expectedLoanAmount"
          label="Expected loan amount"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={expectedLoanAmount?.message}
        />
        <SelectFromOptions
          register={register}
          options={["Yes", "No"]}
          label="Member potential for taking loan? Yes/No"
          name="potentialForLoan"
          errorMessage={potentialForLoan?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default MemberForm;
