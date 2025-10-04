import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import SaveButton from "../../../components/button/SaveButton";
import {
  SelectFromDb,
  SelectFromOptions,
} from "../../../components/SelectList";

const schema = yup.object({
  subMenuId: yup.number(),
  menuId: yup.number().required("Required."),
  subMenuName: yup.string().required("Required.").max(50),
  link: yup.string().required("Required.").max(50),
  icon: yup.string().required("Required.").max(50),
  iconMobile: yup.string().required("Required.").max(50),
  priority: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  section: yup.string().required("Required.").max(50),
});

const SubMenuForm = ({ defaultValues, action, btnText, path, returnPath }) => {
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
  const { menuId, subMenuName, link, icon, priority, section, iconMobile } =
    errors;

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
      <input type="hidden" {...register("subMenuId")} />
      <div className="form-col">
        <SelectFromDb
          control={control}
          name="menuId"
          label="Select Menu"
          path="/adMenu/select"
          isAutoFocus={true}
          errorMessage={menuId?.message}
        />
        <Input
          name="subMenuName"
          label="Sub Menu Name"
          type="text"
          register={register}
          errorMessage={subMenuName?.message}
        />
        <Input
          name="icon"
          label="Icon"
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
        <SelectFromOptions
          register={register}
          options={["N/A", " Attandance", "PayRole", "Hr", "DayOpen", "Job"]}
          label="Select Section"
          name="section"
          errorMessage={section?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default SubMenuForm;
