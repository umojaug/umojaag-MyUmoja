import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import SaveButton from "../../../components/button/SaveButton";
import { SelectFromOptions } from "../../../components/SelectList";
import { selectOptions } from "../../../data/selectOptions";

const schema = yup.object({
  allowanceDeductionId: yup.string().max(50),
  allowanceDeductionName: yup.string().required("Required.").max(50),
  allowanceDeductionType: yup.string().required("Required.").max(50),
});

const AllowanceDeductionForm = ({
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
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { allowanceDeductionName, allowanceDeductionType } = errors;

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
      <input type="hidden" {...register("allowanceDeductionId")} />
      <div className="form-col">
        <Input
          name="allowanceDeductionName"
          label="Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={allowanceDeductionName?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.allowanceDeductionType}
          label="Type"
          name="allowanceDeductionType"
          errorMessage={allowanceDeductionType?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AllowanceDeductionForm;
