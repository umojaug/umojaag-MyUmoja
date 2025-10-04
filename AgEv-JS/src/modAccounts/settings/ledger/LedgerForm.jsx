import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import SaveButton from "../../../components/button/SaveButton";
import Input from "../../../components/Input";
import {
  SelectFromDb,
  SelectFromOptions,
} from "../../../components/SelectList";
import RadioButtons from "../../../components/RadioButtons";

const schema = yup.object({
  ledgerId: yup.string(),
  subGroupId: yup.string().required("Required.").max(50),
  ledgerName: yup.string().required("Required.").max(50),
  displayAt: yup.string().required("Required.").max(50),
  voucherType: yup.string().required("Required.").max(50),
  accountType: yup.string().required("Required.").max(50),
  branchId: yup.string().required("Required.").max(50),
  classificationName: yup.string().required("Required.").max(50),
});

const LedgerForm = ({ defaultValues, action, btnText, path, returnPath }) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
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
    ledgerName,
    displayAt,
    subGroupId,
    voucherType,
    accountType,
    branchId,
    classificationName,
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
      <input type="hidden" {...register("subGroupId")} />
      <div className="form-col">
        <SelectFromDb
          control={control}
          label="Sub Group Name"
          path="/acSubGroup/select"
          name="subGroupId"
          errorMessage={subGroupId?.message}
        />
        <Input
          name="ledgerName"
          label="Ledger Name"
          type="text"
          register={register}
          errorMessage={ledgerName?.message}
        />

        <SelectFromOptions
          register={register}
          options={["HO", "BR"]}
          label="Display At"
          name="displayAt"
          errorMessage={displayAt?.message}
        />
        <RadioButtons
          register={register}
          options={[
            "Payment",
            "Receive",
            "Payment and Receive",
            "Not Applicable",
          ]}
          label="Select Voucher Type"
          name="voucherType"
          errorMessage={voucherType?.message}
        />
        <RadioButtons
          register={register}
          options={["Cash", "Bank", "General"]}
          label="Select Trans Type"
          name="accountType"
          errorMessage={accountType?.message}
        />
        <SelectFromDb
          control={control}
          label="Select Classification"
          path="/acledger/selectByClassification"
          name="classificationName"
          errorMessage={classificationName?.message}
        />
        <SelectFromDb
          control={control}
          label="Select Branches"
          path="/branches/select"
          name="branchId"
          errorMessage={branchId?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default LedgerForm;
