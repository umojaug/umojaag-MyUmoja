import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { usePostData } from "../../hooks/dataApi";
import { SelectFromDb } from "../../components/SelectList";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import InputFile from "../../components/InputFile";
// import InputFile from "../../components/InputFile";

const schema = yup
  .object({
    userId: yup.string(),
    fullName: yup.string().required("Required").max(50),
    phoneNumber: yup
      .string()
      .required("Required")
      .max(12)
      .min(10, "Must be at least 10 characters"),
    role: yup.string().required("Required").max(50),
  })
  .shape({
    picture: yup
      .mixed()
      .required()
      .test("required", "You need to provide a file", (value) => {
        return value && value.length;
      }),
  });
function UserForm({
  defaultValues,
  action,
  btnText,
  isEdit,
  path,
  returnPath,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { fullName, role, phoneNumber, picture } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("userId", formData.userId);
    data.append("fullName", formData.fullName);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("role", formData.role);
    data.append("file", file);
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
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
      <input type="hidden" {...register("userId")} />

      <div className="form-col-3">
        <Input
          name="fullName"
          label="Name"
          type="text"
          register={register}
          errorMessage={fullName?.message}
        />

        <Input
          name="phoneNumber"
          label="Phone Number"
          type="text"
          register={register}
          errorMessage={phoneNumber?.message}
        />

        <SelectFromDb
          control={control}
          name="role"
          label="Select Role"
          path="/userCreate/roleSelect"
          errorMessage={role?.message}
        />
        <InputFile
          name="picture"
          label="Upload Image"
          accept="image/*"
          register={register}
          action={setFile}
          errorMessage={picture?.message}
        />
      </div>
      <div className="from-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
}

export default UserForm;
