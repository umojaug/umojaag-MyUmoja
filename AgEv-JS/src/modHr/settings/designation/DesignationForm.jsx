import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import SaveButton from "../../../components/button/SaveButton";
import { SelectFromDb } from "../../../components/SelectList";

const schema = yup.object({
  designationName: yup.string().required("Required.").max(50),
  roleName: yup.string().required("Required.").max(50),
  kpiDetails: yup.string().required("Required.").max(4000),
  objectiveOne: yup.string().max(2500),
  objectiveTwo: yup.string().max(2500),
  objectiveThree: yup.string().max(2500),
  objectiveFour: yup.string().max(2500),
});

const DesignationForm = ({
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
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    designationName,
    roleName,
    kpiDetails,
    objectiveOne,
    objectiveTwo,
    objectiveThree,
    objectiveFour,
  } = errors;

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
      <input type="hidden" {...register("designationId")} />
      <div className="form-col">
        <Input
          name="designationName"
          label="Designation Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={designationName?.message}
        />
        <SelectFromDb
          control={control}
          label="New Role"
          path="/userCreate/roleSelect"
          name="roleName"
          errorMessage={roleName?.message}
        />
        <TextArea
          name="kpiDetails"
          label="KPI Details"
          control={control}
          errorMessage={kpiDetails?.message}
        />
        <TextArea
          name="objectiveOne"
          label="Performance Objective # 1"
          control={control}
          errorMessage={objectiveOne?.message}
        />
        <TextArea
          name="objectiveTwo"
          label="Performance Objective # 2"
          control={control}
          errorMessage={objectiveTwo?.message}
        />
        <TextArea
          name="objectiveThree"
          label="Performance Objective # 3"
          control={control}
          errorMessage={objectiveThree?.message}
        />
        <TextArea
          name="objectiveFour"
          label="Performance Objective # 4"
          control={control}
          errorMessage={objectiveFour?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default DesignationForm;
