import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import SaveButton from "../../../components/button/SaveButton";

const schema = yup.object({
  weightageId: yup.string().max(50),
  weightageName: yup.string().required("Required.").max(50),
  weightageRangeFrom: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .max(50, "Must be less than or equal to 50")
    .typeError("Positive number required"),
  weightageRangeTo: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .max(50, "Must be less than or equal to 50")
    .typeError("Positive number required"),
});

const WeightageForm = ({
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
  const { weightageName, weightageRangeFrom, weightageRangeTo } = errors;

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
      <input type="hidden" {...register("weightageId")} />
      <div className="form-col">
        <Input
          name="weightageName"
          label="Weightage Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={weightageName?.message}
        />
        <Input
          name="weightageRangeFrom"
          label="Weightage Range From"
          type="text"
          register={register}
          errorMessage={weightageRangeFrom?.message}
        />
        <Input
          name="weightageRangeTo"
          label="Weightage Range To"
          type="text"
          register={register}
          errorMessage={weightageRangeTo?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default WeightageForm;
