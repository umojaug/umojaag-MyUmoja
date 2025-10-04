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
import { SelectFromDb } from "../../../components/SelectList";

const schema = yup.object({
  testId: yup.string().max(50),
  testArea: yup.string().required("Required."),
  testSteps: yup.string().required("Required."),
  departmentId: yup.string().required("Required").max(50),
});

const DepartmentAuditTestForm = ({
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
  const { testArea, departmentId, testSteps } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("testId", formData.testId);
    data.append("testArea", formData.testArea);
    data.append("testSteps", formData.testSteps);
    data.append("departmentId", formData.departmentId); 

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
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
      <input type="hidden" {...register("testId")} />
      <div className="form-col">
      <SelectFromDb
          control={control}
          label="Audit Test Department"
          path="/departments/select"
          name="departmentId"
          errorMessage={departmentId?.message}
        /> 
        <Input
          name="testArea"
          label="Test Area"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={testArea?.message}
        />
        <TextArea
          control={control}
          areaHeight="h-36"
          label="Audit Test"
          name="testSteps"
          errorMessage={testSteps?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default DepartmentAuditTestForm;
