import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import { DataListFromDb } from "../../components/SelectList";

const schema = yup.object({
  employeeId: yup.string().required("Required").max(50),
  amount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .required("Required")
    .typeError("Positive number required"),
  numberOfInstallment: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .required("Required")
    .typeError("Positive number required"),
});

function SalaryAdvanceForm({ path, returnPath }) {
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      employeeId: "",
      amount: "",
      numberOfInstallment: "",
      // effectiveDate: new Date(),
    },
    resolver: yupResolver(schema),
  });

  const { employeeId, amount, numberOfInstallment } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("employeeId", formData.employeeId);
    data.append("amount", formData.amount);
    data.append("numberOfInstallment", formData.numberOfInstallment);
    // data.append(
    //   "effectiveDate",
    //   moment.utc(formData.effectiveDate).local().format("YYYY-MM-DD")
    // );

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
          name="employeeId"
          errorMessage={employeeId?.message}
        />
        <Input
          name="amount"
          label={`Amount (${import.meta.env.VITE_CURRENCY})`}
          type="text"
          register={register}
          errorMessage={amount?.message}
        />
        <Input
          name="numberOfInstallment"
          label="Number Of Installment"
          type="text"
          register={register}
          errorMessage={numberOfInstallment?.message}
        />
      </div>
      <div className="from-cols mt-4">
        <SaveButton btnText="Save" disabled={submitting} />
      </div>
    </form>
  );
}

export default SalaryAdvanceForm;
