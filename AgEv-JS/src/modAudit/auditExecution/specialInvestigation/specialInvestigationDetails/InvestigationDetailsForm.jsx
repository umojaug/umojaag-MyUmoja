import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../../hooks/dataApi";
import SaveButton from "../../../../components/button/SaveButton";
import Input from "../../../../components/Input";
import { AiOutlineFile } from "react-icons/ai";
import InputFile from "../../../../components/InputFile";
import TextArea from "../../../../components/TextArea";

const schema = yup.object({
  investigationDetailsId: yup.string().max(50),
  reportInputs: yup.string().max(5000),
  testConclusion: yup.string(),
});

const InvestigationDetailsForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
  isEdit = "false",
}) => {
  const navigate = useNavigate();

  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);

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
  const { reportInputs, testConclusion, testSteps, guideline } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("investigationDetailsId", formData.investigationDetailsId);
    data.append("guideline", formData.guideline);
    data.append("investigationId", formData.investigationId);
    data.append("testSteps", formData.testSteps);
    data.append("reportInputs", formData.reportInputs);
    data.append("file1", file1);
    data.append("file2", file2);
    data.append("file3", file3);
    data.append("testSteps", formData.testSteps);
    data.append("testConclusion", " ");

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
      <input type="hidden" {...register("investigationDetailsId")} />

      <div className="">
        {isEdit === "true" && (
          <>
            <p>{defaultValues.guideline}</p>
            <p>{defaultValues.testSteps}</p>
          </>
        )}

        {isEdit === "false" && (
          <div>
            <TextArea
              control={control}
              name="testSteps"
              label="Audit Test"
              type="text"
              errorMessage={testSteps?.message}
            />
            <TextArea
              control={control}
              name="guideline"
              label="Guideline"
              type="text"
              errorMessage={guideline?.message}
            />
          </div>
        )}

        <div className="flex w-full">
          <InputFile
            name="file1"
            register={register}
            action={setFile1}
            errorMessage={file1?.message}
          />
          <div className="text-xs ml-2">
            {defaultValues.evidences1 !== "" && (
              <a
                href={defaultValues.evidences1}
                className="btn-success w-12 h-10"
              >
                <AiOutlineFile size={24} />
              </a>
            )}
          </div>
        </div>

        <div className="flex w-full">
          <InputFile
            name="file2"
            register={register}
            action={setFile2}
            errorMessage={file2?.message}
          />
          <div className="text-xs ml-2">
            {defaultValues.evidences2 !== "" && (
              <a
                href={defaultValues.evidences2}
                className="btn-success w-12 h-10"
              >
                <AiOutlineFile size={24} />
              </a>
            )}
          </div>
        </div>

        <div className="flex w-full">
          <InputFile
            name="file3"
            register={register}
            action={setFile3}
            errorMessage={file3?.message}
          />
          <div className="text-xs ml-2">
            {defaultValues.evidences3 !== "" && (
              <a
                href={defaultValues.evidences3}
                className="btn-success w-12 h-10"
              >
                <AiOutlineFile size={24} />
              </a>
            )}
          </div>
        </div>

        <Input
          name="reportInputs"
          label="Report Inputs"
          type="text"
          register={register}
          errorMessage={reportInputs?.message}
        />
        {/* <TextArea
          control={control}
          name="testConclusion"
          label="Test Conclusion"
          type="text"
          errorMessage={testConclusion?.message}
        /> */}
      </div>

      <div className="from-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default InvestigationDetailsForm;
