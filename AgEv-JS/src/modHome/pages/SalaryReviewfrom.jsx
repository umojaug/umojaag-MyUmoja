import React, { useState } from "react";
import { usePostData } from "../../hooks/dataApi";
import TextArea from "../../components/TextArea";
import SaveButton from "../../components/button/SaveButton";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  comments: yup.string().max(1000).required("Required"),
});

const SalaryReviewfrom = ({ defaultValues, path }) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { comments } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
      });
      if (status === 204) {
        toast.success("Thank you for your response!");
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
      <input type="hidden" {...register("salaryReviewId")} />
      <input type="hidden" {...register("isAccept")} />
      <div className="form-col">
        <TextArea
          control={control}
          name="comments"
          label={
            defaultValues.isAccept === 1
              ? "Digital Signature (Write your full name)"
              : "Decline Reason"
          }
          type="text"
          errorMessage={comments?.message}
        />
        <SaveButton
          btnText={defaultValues.isAccept === 1 ? "Accept" : "Decline"}
          disabled={submitting}
        />
      </div>
    </form>
  );
};

export default SalaryReviewfrom;
