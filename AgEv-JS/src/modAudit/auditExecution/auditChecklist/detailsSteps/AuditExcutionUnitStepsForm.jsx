import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";
import { usePostData } from "../../../../hooks/dataApi";
import DatePicker from "../../../../components/DatePicker";
import Label from "../../../../components/Label";
import { SelectFromOptions } from "../../../../components/SelectList";
import Input from "../../../../components/Input";
import SaveButton from "../../../../components/button/SaveButton";
import { AiOutlineFile } from "react-icons/ai";
import TextArea from "../../../../components/TextArea";
import InputFile from "../../../../components/InputFile";

const schema = yup.object({
  executionUnitTestStepId: yup.string().required("Required."),
  testingDate: yup.date().required("Required."),
  sampledMonth: yup.string().required("Required."),
  auditPeriod: yup.string(),
  selectionMethod: yup.string().required("Required."),
  controlFrequency: yup.string().required("Required."),
  sampleSize: yup.string(),
  populationSize: yup.string(),
  testResults: yup.string().required("Required."),
  testingConclusion: yup.string().required("Required."),
});
// .shape({
//   filepath: yup.mixed().when("testResults", {
//     is: "Fail",
//     then: yup
//       .mixed()
//       .test("required", "You need to provide a file", (value) => {
//         return value && value.length;
//       }),
//     otherwise: yup.mixed(),
//   }),
// });

const AuditExcutionUnitStepsForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState("");

  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    // watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    testingDate,
    sampledMonth,
    auditPeriod,
    selectionMethod,
    controlFrequency,
    sampleSize,
    populationSize,
    testResults,
    testingConclusion,
  } = errors;

  const onSubmit = async (formData) => {
    // if (fileUrl === "" && formData.testResults === "Fail") {
    //   toast.error("Upload not complete! Please wait.");
    //   return;
    // }
    // executionUnitTestStepId: list.data.executionUnitTestStepId,
    // testingDate: new Date(list.data.testingDate),
    // sampledMonth: new Date(list.data.sampledMonth),
    // auditPeriod: list.data.auditPeriod,
    // selectionMethod: list.data.selectionMethod,
    // controlFrequency: list.data.controlFrequency,
    // sampleSize: list.data.sampleSize,
    // populationSize: list.data.populationSize,
    // testingConclusion: list.data.testingConclusion,
    // testResults: list.data.testResults,
    // testEvidences: list.data.testEvidences,
    // testStepsName: list.data.testStepsName,
    setSubmitting(true);
    var data = new FormData();
    data.append("executionUnitTestStepId", formData.executionUnitTestStepId);
    data.append(
      "testingDate",
      moment.utc(formData.testingDate).local().format("YYYY-MM-DD")
    );
    data.append("sampledMonth", formData.sampledMonth);
    data.append("auditPeriod", formData.auditPeriod);
    data.append("selectionMethod", formData.selectionMethod);
    data.append("controlFrequency", formData.controlFrequency);
    data.append("sampleSize", formData.sampleSize);
    data.append("populationSize", formData.populationSize);
    data.append("testingConclusion", formData.testingConclusion);
    data.append("testResults", formData.testResults);
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
      <input type="hidden" {...register("auditWorkListId")} />
      <div className="form-col">
        {/* <Label label="Audit Year" value={defaultValues.auditYear} /> */}
        <Label label="Audit Test" value={defaultValues.testStepsName} />
        <Controller
          control={control}
          name="testingDate"
          render={({ field }) => (
            <DatePicker
              label="Testing Date"
              field={field}
              errorMessage={testingDate?.message}
              isRow={false}
            />
          )}
        />

        <Input
          name="sampledMonth"
          label="Sampled Month"
          type="text"
          register={register}
          errorMessage={sampledMonth?.message}
        />
        <Input
          name="auditPeriod"
          label="Audit Period"
          type="text"
          register={register}
          errorMessage={auditPeriod?.message}
        />

        <SelectFromOptions
          register={register}
          options={["Judgmental", "Random", "Stratified", "N/A"]}
          label="Selection Method"
          name="selectionMethod"
          errorMessage={selectionMethod?.message}
        />

        <SelectFromOptions
          register={register}
          options={[
            "Daily",
            "Weekly",
            "Bi-Weekly",
            "Monthly",
            "Quarterly",
            "Half-Yearly",
            "Yearly",
          ]}
          label="Control Frequency"
          name="controlFrequency"
          errorMessage={controlFrequency?.message}
        />
        {/* <Input
          name="sampleSize"
          label="Sample Size"
          type="text"
          register={register}
          errorMessage={sampleSize?.message}
        /> */}

        <TextArea
          control={control}
          name="sampleSize"
          label="Sample Size"
          type="text"
          errorMessage={sampleSize?.message}
        />

        <TextArea
          control={control}
          name="populationSize"
          label="Population Size"
          type="text"
          errorMessage={populationSize?.message}
        />

        {/* <Input
          name="populationSize"
          label="Population Size"
          type="text"
          register={register}
          errorMessage={populationSize?.message}
        /> */}

        <SelectFromOptions
          register={register}
          options={["Pass", "Fail"]}
          label="Testing Conclusion"
          name="testingConclusion"
          errorMessage={testingConclusion?.message}
        />

        <TextArea
          control={control}
          name="testResults"
          label="Test Results"
          type="text"
          errorMessage={testResults?.message}
        />

        <div>
          <label>Testing Evidences / Appendicies (Insert References) </label>
          <div className="flex w-full">
            <InputFile
              name="file"
              register={register}
              action={setFile}
              errorMessage={file?.message}
            />
            <div className="text-xs ml-2">
              {defaultValues.testEvidences !== "" ? (
                <a
                  href={defaultValues.testEvidences}
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
        </div>
        {/* {finalQuery === "Fail" && ( */}
        <>
          {/* <Input
              name="overallTestConclusion"
              label="Overall Test Conclusion"
              type="text"
              register={register}
              errorMessage={overallTestConclusion?.message}
            /> */}
          {/* {defaultValues.auditAreaId !== 6 && (
              <>
                <Input
                  name="finding"
                  label="Finding"
                  type="text"
                  register={register}
                  errorMessage={finding?.message}
                />
                <Input
                  name="cause"
                  label="Cause"
                  type="text"
                  register={register}
                  errorMessage={cause?.message}
                />
                <Input
                  name="implication"
                  label="Implication"
                  type="text"
                  register={register}
                  errorMessage={implication?.message}
                />
                <Input
                  name="recommendation"
                  label="Recommendation"
                  type="text"
                  register={register}
                  errorMessage={recommendation?.message}
                />
                <Input
                  name="branchResponse"
                  label="Branch Response"
                  type="text"
                  register={register}
                  errorMessage={branchResponse?.message}
                />

                <Controller
                  control={control}
                  name="implementationDate"
                  render={({ field }) => (
                    <DatePicker
                      label="Implementation Date"
                      field={field}
                      errorMessage={implementationDate?.message}
                      isRow={false}
                    />
                  )}
                />
                <Input
                  name="managementAction"
                  label="Management Action"
                  type="text"
                  register={register}
                  errorMessage={managementAction?.message}
                />
              </>
            )} */}
          {/* <Input
              name="testEvidences"
              label="Test Evidences"
              type="text"
              register={register}
              errorMessage={testEvidences?.message}
            /> */}
        </>
        {/* )} */}
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AuditExcutionUnitStepsForm;
