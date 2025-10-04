import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import Label from "../../../components/Label";
import SaveButton from "../../../components/button/SaveButton";
import {
  SelectFromDb,
  SelectFromOptions,
} from "../../../components/SelectList";
import useWeightage from "../../auditHooks/useWeightage";

const schema = yup.object({
  planDetailsId: yup.number(),
  // branchId: yup.string().required("Required.").max(50),
  fraud: yup.string().required("Required.").max(50),
  staffTurnover: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  inherentRisk: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  residualRisk: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  // overallRiskRating: yup.string().required("Required.").max(50),
  selectedForAuditPeriod: yup.string().required("Required.").max(50),
  budget: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
});

const AuditPlaningDetailsFrom = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const { getWeightage } = useWeightage();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    fraud,
    staffTurnover,
    inherentRisk,
    residualRisk,
    // overallRiskRating,
    selectedForAuditPeriod,
    budget,
    branchId,
  } = errors;

  const inherentRiskValue = watch("inherentRisk", 0);
  const residualRiskValue = watch("residualRisk", 0);

  const weightageValue =
    inherentRiskValue === 0 && residualRiskValue === 0
      ? defaultValues.inherentRisk * defaultValues.residualRisk
      : inherentRiskValue * residualRiskValue;

  const overallRiskRatingValue = getWeightage(weightageValue);

  const onSubmit = async (formData) => {

    if (overallRiskRatingValue === undefined) {
      toast.error("Overall Risk Rating Value not found");
      return;
    }

    setSubmitting(true);

    try {
      formData.overallRiskRating = overallRiskRatingValue;
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        // reset();
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
      <input type="hidden" {...register("planDetailsId")} />
      <input type="hidden" {...register("planMasterId")} />
      <div className="form-col">
        {/* {defaultValues.planDetailsId === 0 && (
          <>
            <SelectFromDb
              control={control}
              label="Branch Select"
              path="/branches/select"
              name="branchId"
              errorMessage={branchId?.message}
            />
          </>
        )} */}

        <SelectFromOptions
          register={register}
          options={["Yes", "No"]}
          label="Fraud"
          name="fraud"
          errorMessage={fraud?.message}
        />
        <Input
          name="staffTurnover"
          label="Staff Turnover"
          type="text"
          register={register}
          errorMessage={staffTurnover?.message}
        />
        <SelectFromDb
          control={control}
          label="Inherent Risk"
          path="/auditinherentrisk/select"
          name="inherentRisk"
          errorMessage={inherentRisk?.message}
        />
        <SelectFromDb
          control={control}
          label="Residual Risk"
          path="/auditresidualrisk/select"
          name="residualRisk"
          errorMessage={residualRisk?.message}
        />
        <Label label="Weightage:" value={weightageValue} />
        <Label label="Overall Risk Rating" value={overallRiskRatingValue} />
        {/* <SelectFromOptions
          register={register}
          options={["Critical", "High", "Medium", "Low"]}
          label="Overall Risk Rating"
          name="overallRiskRating"
          errorMessage={overallRiskRating?.message}
        /> */}
        <SelectFromOptions
          register={register}
          options={["Yes", "No"]}
          label="Selected For Audit Period Type"
          name="selectedForAuditPeriod"
          errorMessage={selectedForAuditPeriod?.message}
        />
        <Input
          name="budget"
          label="Budget"
          type="text"
          register={register}
          errorMessage={budget?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AuditPlaningDetailsFrom;
