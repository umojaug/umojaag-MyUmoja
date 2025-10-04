import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../../hooks/dataApi";
import SaveButton from "../../../../components/button/SaveButton";
import Input from "../../../../components/Input";
import TextArea from "../../../../components/TextArea";
import { SelectFromOptions } from "../../../../components/SelectList";
import { selectOptions } from "../../../../data/selectOptions";
import { AiOutlineFile } from "react-icons/ai";
import InputFile from "../../../../components/InputFile";
import Label from "../../../../components/Label";
import DatePicker from "../../../../components/DatePicker";
import moment from "moment";

const schema = yup.object({
  investigationDetailsId: yup.string().max(50),
  investigationId: yup.string(),
  sampleSelectionMethod: yup.string(),
  controlFrequency: yup.string(),
  populationSize: yup.string(),
  sampleSize: yup.string(),
  testConclusion: yup.string(),
  auditFinding: yup.string(),
  // testArea: yup.string(),
  // testSteps: yup.string(),
  // cause: yup.string(),
  // implication: yup.string(),
  // controlOwnerResponse: yup.string(),
  // implementationDate: yup.date(),
  // managementAction: yup.string(),
  // exceptions: yup.string(),
  // evidences: yup.string(),
  // recommendation: yup.string(),
});

const DepartmentalInvestigationDetailsForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const { mutateAsync, reset } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  // const [file, setEvidences] = useState("");

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
    testingDate,
    sampledMonth,
    auditPeriod,
    testConclusion,
    auditFinding,
    sampleSelectionMethod,
    controlFrequency,
    sampleSize,
    populationSize,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("investigationDetailsId", formData.investigationDetailsId);
    data.append(
      "testingDate",
      moment.utc(formData.testingDate).local().format("YYYY-MM-DD")
    );
    data.append("sampledMonth", formData.sampledMonth);
    data.append("auditPeriod", formData.auditPeriod);
    data.append("sampleSelectionMethod", formData.sampleSelectionMethod);
    data.append("controlFrequency", formData.controlFrequency);
    data.append("populationSize", formData.populationSize);
    data.append("sampleSize", formData.sampleSize);
    data.append("testConclusion", formData.testConclusion);
    data.append("auditFinding", formData.auditFinding);
    data.append("file", file);
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        setFile("");
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
      <input type="hidden" {...register("investigationDetailsId")} />

      <div className="form-col">
        {/* <p>{defaultValues.testArea}</p>
        <p>{defaultValues.testSteps}</p> */}

        <Label label="Audit Test" value={defaultValues.testSteps} />
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
          options={selectOptions.sampleMethod}
          label="Sample Selection Method"
          name="sampleSelectionMethod"
          errorMessage={sampleSelectionMethod?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.controlFrequencydrop}
          label="Control Frequency"
          name="controlFrequency"
          errorMessage={controlFrequency?.message}
        />

        {/* <Input
          name="populationSize"
          label="Population Size"
          type="text"
          register={register}
          errorMessage={populationSize?.message}
        />
        <Input
          name="sampleSize"
          label="Sample Size"
          type="text"
          register={register}
          errorMessage={sampleSize?.message}
        /> */}

        <TextArea
          control={control}
          name="populationSize"
          label="Population Size"
          type="text"
          errorMessage={populationSize?.message}
        />

        <TextArea
          control={control}
          name="sampleSize"
          label="Sample Size"
          type="text"
          errorMessage={sampleSize?.message}
        />

        <SelectFromOptions
          register={register}
          options={selectOptions.testConclusion}
          label="Testing Conclusion"
          name="testConclusion"
          errorMessage={testConclusion?.message}
        />
        <TextArea
          control={control}
          areaHeight="h-36"
          name="auditFinding"
          label="Test Result"
          register={register}
          errorMessage={auditFinding?.message}
        />
        <div className="flex w-full">
          <InputFile
            name="file"
            register={register}
            action={setFile}
            errorMessage={file?.message}
          />
          <div className="text-xs ml-2">
            {defaultValues.evidences !== "" ? (
              <a
                href={defaultValues.evidences}
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

      <div className="from-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default DepartmentalInvestigationDetailsForm;
