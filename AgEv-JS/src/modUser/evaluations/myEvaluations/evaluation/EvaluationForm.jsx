import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../../hooks/dataApi";
import SaveButton from "../../../../components/button/SaveButton";
import { SelectFromDb } from "../../../../components/SelectList";

const schema = yup.object({
  evaluationId: yup.string().max(50),
  evaluationTypeId: yup.string().required("Required.").max(50),
  managerId: yup.string().required("Required.").max(50),
});

const EvaluationForm = ({
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
  const { evaluationTypeId, managerId } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var datas = new FormData();
    datas.append("evaluationId", formData.evaluationId);
    datas.append("evaluationTypeId", formData.evaluationTypeId);
    datas.append("managerId", formData.managerId);

    try {
      const { data, status } = await mutateAsync({
        path: path,
        formData: datas,
      });

      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        if (
          formData.evaluationTypeId === "746F1B0D-8A46-4AC4-B44F-3523F0AE9095"
        )
          navigate(`/my/evaluation/details/${data}`);

        if (
          formData.evaluationTypeId === "ACE7C1A5-C2F9-407F-B10C-08072BB4661A"
        )
          navigate(`/my/evaluationSix/details/${data}`);

        if (
          formData.evaluationTypeId === "45B39B3E-1F37-4CC1-8E5D-2AC4D8CF14CC"
        ) {
          navigate(`/my/evaluationThree/details/${data}`);
        }
      }
      if (status === 204) {
        toast.success("Update successful!");
        if (
          formData.evaluationTypeId === "746F1B0D-8A46-4AC4-B44F-3523F0AE9095"
        )
          navigate(`/my/evaluation/details/${defaultValues.evaluationId}`);

        if (
          formData.evaluationTypeId === "ACE7C1A5-C2F9-407F-B10C-08072BB4661A"
        )
          navigate(`/my/evaluationSix/details/${defaultValues.evaluationId}`);

        if (
          formData.evaluationTypeId === "45B39B3E-1F37-4CC1-8E5D-2AC4D8CF14CC"
        ) {
          navigate(`/my/evaluationThree/details/${defaultValues.evaluationId}`);
        }
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
      <input type="hidden" {...register("evaluationId")} />
      <div className="form-col">
        <SelectFromDb
          control={control}
          label="Evaluation Type"
          path="/evaluationtype/select"
          name="evaluationTypeId"
          errorMessage={evaluationTypeId?.message}
        />

        <SelectFromDb
          control={control}
          label="Select Manager"
          path="/employees/selectmanager"
          name="managerId"
          errorMessage={managerId?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default EvaluationForm;
