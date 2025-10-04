import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import SaveButton from "../../../components/button/SaveButton";
import Input from "../../../components/Input";
import { SelectFromDb } from "../../../components/SelectList";

const schema = yup.object({
  groupId: yup.string(),
  mainId: yup.string().required("Required.").max(50),
  groupName: yup.string().required("Required.").max(50),
});

const GroupForm = ({ defaultValues, action, btnText, path, returnPath }) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
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
  const { groupName, mainId } = errors;

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
      <input type="hidden" {...register("mainId")} />
      <div className="form-col">
      {/* <SelectFromOptions
          register={register}
          options={["Assets", "Liabilities", "Income", "Expenditure"]}
          label="Main Name"
          name="mainName"
          errorMessage={mainName?.message}
        /> */}
         <SelectFromDb
          control={control}
          label="Main Name"
          path="/acGroup/acMainSelect"
          name="mainId"
          errorMessage={mainId?.message}
        />
        <Input
          name="groupName"
          label="Group Name"
          type="text"
          register={register}
          errorMessage={groupName?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default GroupForm;
