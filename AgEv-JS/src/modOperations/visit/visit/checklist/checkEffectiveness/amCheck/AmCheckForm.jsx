import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../../../../components/Input";
import SaveButton from "../../../../../../components/button/SaveButton";
import { usePostData } from "../../../../../../hooks/dataApi";

const schema = yup.object({
  allAmEffectId: yup.number(),
  allVisitId: yup.string().required("Required.").max(50),
  strength: yup.string().required("Required.").max(500),
  weakness: yup.string().required("Required.").max(500),
  actionTaken: yup.string().required("Required.").max(500),
});

const AmCheckForm = ({ defaultValues, action, btnText, path, returnPath }) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { actionTaken, strength, weakness } = errors;
  const onSubmit = async (formData) => {
    setSubmitting(true);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
      });

      if (status === 201) {
        toast.success("Saved successfully!");
        navigate(returnPath);
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
      <input type="hidden" {...register("allAmEffectId")} />
      <input type="hidden" {...register("allVisitId")} />
      <div className="form-col">
        <Input
          name="strength"
          label="Strength"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={strength?.message}
        />

        <Input
          name="weakness"
          label="Weakness"
          type="text"
          register={register}
          errorMessage={weakness?.message}
        />
        <Input
          name="actionTaken"
          label="Action Taken"
          type="text"
          register={register}
          errorMessage={actionTaken?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AmCheckForm;
