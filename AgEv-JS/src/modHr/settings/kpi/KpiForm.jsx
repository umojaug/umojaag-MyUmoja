import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import SaveButton from "../../../components/button/SaveButton";
import TextArea from "../../../components/TextArea";

const schema = yup.object({
  kpiName: yup.string().required("Required.").max(50),
  details: yup.string().required("Required.").max(4000),
});

const KpiForm = ({ defaultValues, action, btnText, path, returnPath }) => {
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
  const { kpiName, details } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    // var data = new FormData();
    // data.append("kpiName", formData.kpiName);
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
      <input type="hidden" {...register("kpiId")} />
      <div className="form-col">
        <Input
          name="kpiName"
          label="kpi Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={kpiName?.message}
        />
        <TextArea
          control={control}
          name="details"
          label="details"
          errorMessage={details?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default KpiForm;
