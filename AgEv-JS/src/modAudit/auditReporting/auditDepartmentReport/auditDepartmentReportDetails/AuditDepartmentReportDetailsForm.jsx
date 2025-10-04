import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";
import { AiOutlineFile } from "react-icons/ai";
import { usePostData } from "../../../../hooks/dataApi";
import {
  SelectFromDb,
  SelectFromOptions,
} from "../../../../components/SelectList";
import { selectOptions } from "../../../../data/selectOptions";
import Input from "../../../../components/Input";
import TextArea from "../../../../components/TextArea";
import InputFile from "../../../../components/InputFile";
import SaveButton from "../../../../components/button/SaveButton";
import DatePicker from "../../../../components/DatePicker";

const schema = yup.object({
  reportDetailsId: yup.string().max(255),
  areaOfReviewId: yup.string().required("Required").max(300),
  detailedAuditFinding: yup.string().required("Required").max(4000),
  primaryRootCauseId: yup.string().required("Required").max(50),
  riskImplicationId: yup.string().required("Required").max(50),
  recommendations: yup.string().required("Required").max(300),
  implementedBy: yup.string().required("Required").max(300),
  riskCategory: yup.string().required("Required").max(300),
  departmentResponse: yup.string().max(300),
  managementResponse: yup.string().max(300),
  commitmentDate: yup.date().required("Required"),
  overallControlsAssessment: yup.string().required("Required").max(300),
  fraudRisk: yup.string().required("Required").max(300),
  repeatFinding: yup.string().required("Required").max(300),
  followUpCommentIfAny: yup.string().required("Required").max(300),
  iaInCharge: yup.string().required("Required").max(300),
});

const AuditDepartmentReportDetailsForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  // const [appendicies, setPhoto] = useState("");
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    areaOfReviewId,
    detailedAuditFinding,
    primaryRootCauseId,
    riskImplicationId,
    recommendations,
    implementedBy,
    riskCategory,
    departmentResponse,
    managementResponse,
    overallControlsAssessment,
    fraudRisk,
    repeatFinding,
    followUpCommentIfAny,
    iaInCharge,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("reportDetailsId", formData.reportDetailsId);
    data.append("areaOfReviewId", formData.areaOfReviewId);
    data.append("detailedAuditFinding", formData.detailedAuditFinding);
    data.append("primaryRootCauseId", formData.primaryRootCauseId);
    data.append("riskImplicationId", formData.riskImplicationId);
    data.append("recommendations", formData.recommendations);
    data.append("implementedBy", formData.implementedBy);
    data.append("riskCategory", formData.riskCategory);
    data.append("departmentResponse", formData.departmentResponse);
    data.append("managementResponse", formData.managementResponse);
    data.append(
      "commitmentDate",
      moment.utc(formData.commitmentDate).local().format("YYYY-MM-DD")
    );
    data.append(
      "overallControlsAssessment",
      formData.overallControlsAssessment
    );
    data.append("fraudRisk", formData.fraudRisk);
    data.append("repeatFinding", formData.repeatFinding);
    data.append("followUpCommentIfAny", formData.followUpCommentIfAny);
    data.append("iaInCharge", formData.iaInCharge);
    data.append("file", file);
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
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
      <input type="hidden" {...register("reportDetailsId")} />

      <div className="form-col">
        <SelectFromDb
          control={control}
          label="Audit Area"
          path="/areaOfReview/select"
          name="areaOfReviewId"
          errorMessage={areaOfReviewId?.message}
        />
        <TextArea
          control={control}
          areaHeight="h-36"
          name="detailedAuditFinding"
          label="Audit Finding"
          register={register}
          errorMessage={detailedAuditFinding?.message}
        />

        <SelectFromDb
          control={control}
          label="Primary Root Cause"
          path="/primaryRootCause/select"
          name="primaryRootCauseId"
          errorMessage={primaryRootCauseId?.message}
        />

        <SelectFromDb
          control={control}
          label="Risk Implication"
          path="/riskImplication/select"
          name="riskImplicationId"
          errorMessage={riskImplicationId?.message}
        />
        <Input
          name="recommendations"
          label="Recommendations"
          type="text"
          register={register}
          errorMessage={recommendations?.message}
        />
        <SelectFromDb
          control={control}
          label="Implemented By"
          path={`/employees/SelectByDepartmentFocal/${defaultValues.departmentId}`}
          name="implementedBy"
          errorMessage={implementedBy?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.riskCategory}
          name="riskCategory"
          label="Risk Category"
          errorMessage={riskCategory?.message}
        />
        <Input
          name="departmentResponse"
          label="Department response"
          type="text"
          register={register}
          errorMessage={departmentResponse?.message}
        />
        <Input
          name="managementResponse"
          label="Management Response"
          type="text"
          register={register}
          errorMessage={managementResponse?.message}
        />
        <Controller
          control={control}
          name="commitmentDate"
          render={({ field }) => (
            <DatePicker label="Commitment Date" field={field} />
          )}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.overrallControlsAssessment}
          name="overallControlsAssessment"
          label="Overall Controls Assessment"
          errorMessage={overallControlsAssessment?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.fraudRisk}
          name="fraudRisk"
          label="Fraud Risk"
          errorMessage={fraudRisk?.message}
        />
        <Input
          name="repeatFinding"
          label="Repeat Finding"
          type="text"
          register={register}
          errorMessage={repeatFinding?.message}
        />
        <Input
          name="followUpCommentIfAny"
          label="Follow Up Comment If Any"
          type="text"
          register={register}
          errorMessage={followUpCommentIfAny?.message}
        />
        <SelectFromDb
          control={control}
          label="IA In Charge"
          path="/employees/SelectAuditor"
          name="iaInCharge"
          errorMessage={iaInCharge?.message}
        />
        <div className="flex w-full">
          <InputFile
            name="file"
            register={register}
            action={setFile}
            errorMessage={file?.message}
          />
          <div className="text-xs ml-2">
            {defaultValues.appendicies !== "" ? (
              <a
                href={defaultValues.appendicies}
                className="btn-success w-12 h-10"
              >
                <AiOutlineFile size={24} />
              </a>
            ) : (
              <></>
            )}
            {/* <label>{evidences}</label> */}
          </div>
        </div>
        <div className="text-xs">{/* <label>{appendicies}</label> */}</div>
      </div>

      <div className="form-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AuditDepartmentReportDetailsForm;
