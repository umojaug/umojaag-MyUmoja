import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import toast from "react-hot-toast";
import SaveButton from "../../../components/button/SaveButton";
import {
  SelectFromDb,
  SelectFromOptions,
} from "../../../components/SelectList";

const schema = yup.object({
  role: yup.string().required("Required").max(50),
  buttonName: yup.string().required("Required").max(50),
});

const AuthorityMappingForm = ({ defaultValues, action, btnText, path }) => {
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
  const { role, buttonName } = errors;

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
      <div className="form-col">
        <SelectFromDb
          control={control}
          name="role"
          label="Select Role"
          path="/userCreate/roleSelect"
          errorMessage={role?.message}
        />
        <SelectFromOptions
          register={register}
          options={["Edit", "Delete", "ReAdmission"]}
          label="Button Select"
          name="buttonName"
          errorMessage={buttonName?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AuthorityMappingForm;
