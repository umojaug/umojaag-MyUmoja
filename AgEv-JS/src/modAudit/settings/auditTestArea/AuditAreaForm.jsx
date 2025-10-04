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

const schema = yup.object({
  auditAreaId: yup.string().max(50),
  auditAreaName: yup.string().required("Required.").max(100),
  auditAreatype: yup.string().required("Required.").max(100),
  priority: yup.string().required("Required.").max(100),
});

const AuditAreaForm = ({
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
  const { auditAreaName, auditAreatype, priority } = errors;

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
      <input type="hidden" {...register("auditAreaId")} />
      <div className="form-col">
        <Input
          name="auditAreaName"
          label="AuditArea Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={auditAreaName?.message}
        />
        <SelectFromOptions
          register={register}
          options={["Branch", "Region"]}
          label="Type"
          name="auditAreatype"
          errorMessage={auditAreatype?.message}
        />

        <Input
          name="priority"
          label="Priority "
          type="text"
          register={register}
          errorMessage={priority?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AuditAreaForm;
