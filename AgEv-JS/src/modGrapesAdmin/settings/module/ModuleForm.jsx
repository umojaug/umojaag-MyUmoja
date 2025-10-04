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
  moduleId: yup.number(),
  moduleName: yup.string().required("Required.").max(50),
  icon: yup.string().required("Required.").max(50),
  iconMobile: yup.string().required("Required.").max(50),
  link: yup.string().required("Required.").max(50),
  priority: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
});

const ModuleForm = ({ defaultValues, action, btnText, path, returnPath }) => {
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
  const { moduleName, link, icon, iconMobile, priority } = errors;

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
      <input type="hidden" {...register("moduleId")} />
      <div className="form-col">
        <Input
          name="moduleName"
          label="Module Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={moduleName?.message}
        />
        <Input
          name="icon"
          label="Icon Name"
          type="text"
          register={register}
          errorMessage={icon?.message}
        />
        <Input
          name="iconMobile"
          label="Mobile Icon"
          type="text"
          register={register}
          errorMessage={iconMobile?.message}
        />
        <Input
          name="link"
          label="Link"
          type="text"
          register={register}
          errorMessage={link?.message}
        />
        <Input
          name="priority"
          label="Priority"
          type="text"
          register={register}
          errorMessage={priority?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default ModuleForm;
