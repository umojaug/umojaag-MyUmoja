import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SaveButton from "../../../components/button/SaveButton";

import {
  SelectFromDb,
  SelectFromOptions,
} from "../../../components/SelectList";
import { Select2FromDb } from "../../../components/Select2FromDB";

const schema = yup.object({
  forexId: yup.string().max(50),
  transactionType: yup.string().required("Required.").max(50),
  // loanProductId: yup.string().required("Required.").max(50),
  ledgerId: yup.string().required("Required.").max(50),
  type: yup.string().required("Required.").max(50),
});

const VoucherMappingForm = ({
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
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { transactionType, loanProductId, type, ledgerId } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("voucherMappingId", formData.voucherMappingId);
    data.append("transactionType", formData.transactionType);
    data.append("loanProductId", formData.loanProductId);
    data.append("type", formData.type);
    data.append("ledgerId", formData.ledgerId);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
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
      <input type="hidden" {...register("voucherMappingId")} />
      <div className="form-col">
        <SelectFromDb
          control={control}
          label="Mapping Category"
          path="VoucherMapping/TransactionTypeSelect"
          name="transactionType"
          errorMessage={transactionType?.message}
        />
        <SelectFromDb
          control={control}
          label="Select Loan Product"
          path="LoanProduct/Select"
          name="loanProductId"
          errorMessage={loanProductId?.message}
        />
        <Select2FromDb
          control={control}
          label="Ledger Name"
          path="AcLedger/select"
          name="ledgerId"
          errorMessage={ledgerId?.message}
        />

        <SelectFromOptions
          register={register}
          options={["Debit", "Credit"]}
          label="Debit/Credit"
          name="type"
          errorMessage={type?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default VoucherMappingForm;
