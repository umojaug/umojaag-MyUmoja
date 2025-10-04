import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import moment from "moment";
import DatePicker from "../../components/DatePicker";
import { DataListFromDb, SelectFromDb } from "../../components/SelectList";

const schema = yup.object({
  pinName: yup.string().required("Required").max(50),
  allowanceDeductionId: yup.string().required("Required").max(50),
  effectiveDate: yup.date().required("Required"),
  amount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  particulars: yup.string().required("Required").max(4000),
});

function AllowanceDeductionForm({ path, returnPath }) {
  const navigate = useNavigate();
  const { mutateAsync, reset } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pinName: "",
      allowanceDeductionId: "",
      effectiveDate: new Date(),
      amount: "",
      particulars: "",
    },
    resolver: yupResolver(schema),
  });
  const { pinName, allowanceDeductionId, effectiveDate, amount, particulars } =
    errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("pinName", formData.pinName);
    data.append("allowanceDeductionId", formData.allowanceDeductionId);
    data.append(
      "effectiveDate",
      moment.utc(formData.effectiveDate).local().format("YYYY-MM-DD")
    );
    data.append("amount", formData.amount);
    data.append("particulars", formData.particulars);

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
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-col">
        <DataListFromDb
          register={register}
          label="Employee"
          path="/employees/select"
          name="pinName"
          errorMessage={pinName?.message}
        />

        <SelectFromDb
          control={control}
          label="Allowance / Deduction"
          path="/allowancedeductions/select"
          name="allowanceDeductionId"
          errorMessage={allowanceDeductionId?.message}
        />
        <Controller
          control={control}
          name="effectiveDate"
          render={({ field }) => (
            <DatePicker
              label="Effective Date"
              field={field}
              errorMessage={effectiveDate?.message}
              isRow={false}
            />
          )}
        />
        <Input
          name="amount"
          label="Amount"
          type="text"
          register={register}
          errorMessage={amount?.message}
        />
        <Input
          name="particulars"
          label="Particulars"
          type="text"
          register={register}
          errorMessage={particulars?.message}
        />
      </div>
      <div className="from-cols mt-4">
        <SaveButton btnText="Save" disabled={submitting} />
      </div>
    </form>
  );
}

export default AllowanceDeductionForm;
