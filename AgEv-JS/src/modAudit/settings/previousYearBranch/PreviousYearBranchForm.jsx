import React, { useState } from "react";
import { usePostData } from "../../../hooks/dataApi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import SaveButton from "../../../components/button/SaveButton";
import {
  SelectAllFromDb,
  SelectFromOptions,
} from "../../../components/SelectList";
import { selectOptions } from "../../../data/selectOptions";

const schema = yup.object({
  yearName: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  AuName: yup.string().required("Required").max(50),
  portfolioValue: yup.string().required("Required").max(50),
  par: yup.string().required("Required").max(4000),
  numOfBorrower: yup.number().required("Required").max(4000),
});

function PreviousYearBranchForm({ path, returnPath }) {
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
      yearName: "",
      auName: "",
      portfolioValue: "",
      par: "",
      numOfBorrower: "",
    },

    resolver: yupResolver(schema),
  });
  const { yearName, auName, portfolioValue, par, numOfBorrower } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("yearName", formData.yearName);
    data.append("auName", formData.auName);
    data.append("portfolioValue", formData.portfolioValue);
    data.append("par", formData.par);
    data.append("numOfBorrower", formData.numOfBorrower);

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
        {/* <Input
          name="yearName"
          label="Year"
          type="text"
          register={register}
          errorMessage={yearName?.message}
        /> */}

        <SelectFromOptions
          register={register}
          options={selectOptions.years}
          label="Year"
          name="yearName"
          errorMessage={yearName?.message}
        />
        <SelectAllFromDb
          control={control}
          label="Branch"
          path="/branches/select"
          name="auName"
          errorMessage={auName?.message}
        />
        <Input
          name="portfolioValue"
          label="Portfolio Value"
          type="text"
          register={register}
          errorMessage={portfolioValue?.message}
        />
        <Input
          name="par"
          label="PAR"
          type="text"
          register={register}
          errorMessage={par?.message}
        />
        <Input
          name="numOfBorrower"
          label="Number Of Borrower"
          type="text"
          register={register}
          errorMessage={numOfBorrower?.message}
        />
      </div>
      <div className="from-cols mt-4">
        <SaveButton btnText="Save" disabled={submitting} />
      </div>
    </form>
  );
}

export default PreviousYearBranchForm;
