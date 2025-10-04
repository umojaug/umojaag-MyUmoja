import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import InputFile from "../../components/InputFile";
import { useForm } from "react-hook-form";
import { selectOptions } from "../../data/selectOptions";
import { SelectFromDb, SelectFromOptions } from "../../components/SelectList";
import TextArea from "../../components/TextArea";

const schema = yup.object({
  reportId: yup.string().max(50),
  reportingQuarter: yup.string().max(50).required("Required"),
  monthOfAudit: yup.string().max(50).required("Required"),
  departmentId: yup.string().max(50).required("Required"),
  branchId: yup.string().max(50).required("Required"),
  // regionId: yup.string().max(50).required("Required"),
  detectionMethod: yup.string().max(50).required("Required"),
  typeOfFraudId: yup.string().max(50).required("Required"),
  whoMightBeInvolved: yup.string().max(50).required("Required"),
  positionOfFraudster: yup.string().max(50).required("Required"),
  lengthOfServiceOfFraudster: yup.string().max(50).required("Required"),
  howIsTheFraudBeingPerpetrated: yup.string().required("Required"),
  numberOfOccurences: yup.string().max(50).required("Required"),
  potentialWitness: yup.string().max(50).required("Required"),
  // documentReview1: yup.string().max(50).required("Required"),
  // documentReview2: yup.string().max(50).required("Required"),
  // documentReview3: yup.string().max(50).required("Required"),
  // documentReview4: yup.string().max(50).required("Required"),
  observations: yup.string().required("Required"),
  defectiveControlsIdentified: yup.string().max(50).required("Required"),
  estimatedFraudLoss: yup.string().max(50).required("Required"),
  recommendations: yup.string().required("Required"),
  managementResponse: yup.string().max(50).required("Required"),
  implementedBy: yup.string().max(50).required("Required"),
  iaInCharge: yup.string().max(50).required("Required"),
  amountRecovered: yup.string().max(50).required("Required"),
  status: yup.string().max(50).required("Required"),
  currentStatusUpdate: yup.string().max(50).required("Required"),
});
// .shape({
//   picture: yup
//     .mixed()
//     .required()
//     .test("required", "You need to provide a file", (value) => {
//       return value && value.length;
//     }),
//   // .test("fileSize", "The file is too large", (value, context) => {
//   //   return value && value[0] && value[0].size <= 200000;
//   // })
//   // .test("type", "We only support jpeg", function (value) {
//   //   return value && value[0] && value[0].type === "image/jpeg";
//   // }),
// });

const FmpuForm = ({ defaultValues, action, btnText, path, returnPath }) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);
  const [file6, setFile6] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    reportingQuarter,
    monthOfAudit,
    departmentId,
    branchId,
    // regionId,
    detectionMethod,
    typeOfFraudId,
    whoMightBeInvolved,
    positionOfFraudster,
    lengthOfServiceOfFraudster,
    howIsTheFraudBeingPerpetrated,
    numberOfOccurences,
    potentialWitness,
    // documentReview1,
    // documentReview2,
    // documentReview3,
    // documentReview4,
    observations,
    defectiveControlsIdentified,
    estimatedFraudLoss,
    recommendations,
    managementResponse,
    implementedBy,
    iaInCharge,
    amountRecovered,
    status,
    currentStatusUpdate,
  } = errors;

  const branchSelectId = watch("branchId", defaultValues.branchId);

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("reportId", formData.reportId);
    data.append("reportingQuarter", formData.reportingQuarter);
    data.append("monthOfAudit", formData.monthOfAudit);
    data.append("departmentId", formData.departmentId);
    data.append("branchId", formData.branchId);
    // data.append("regionId", formData.regionId);
    data.append("detectionMethod", formData.detectionMethod);
    data.append("typeOfFraudId", formData.typeOfFraudId);
    data.append("whoMightBeInvolved", formData.whoMightBeInvolved);
    data.append("positionOfFraudster", formData.positionOfFraudster);
    data.append(
      "lengthOfServiceOfFraudster",
      formData.lengthOfServiceOfFraudster
    );
    data.append(
      "howIsTheFraudBeingPerpetrated",
      formData.howIsTheFraudBeingPerpetrated
    );
    data.append("numberOfOccurences", formData.numberOfOccurences);
    data.append("potentialWitness", formData.potentialWitness);

    // data.append("documentReview1", formData.documentReview1);
    // data.append("documentReview2", formData.documentReview2);
    // data.append("documentReview3", formData.documentReview3);
    // data.append("documentReview4", formData.documentReview4);
    data.append("observations", formData.observations);
    data.append(
      "defectiveControlsIdentified",
      formData.defectiveControlsIdentified
    );
    data.append("estimatedFraudLoss", formData.estimatedFraudLoss);
    data.append("recommendations", formData.recommendations);
    data.append("managementResponse", formData.managementResponse);
    data.append("implementedBy", formData.implementedBy);
    data.append("amountRecovered", formData.amountRecovered);
    data.append("status", formData.status);
    data.append("currentStatusUpdate", formData.currentStatusUpdate);
    data.append("iaInCharge", formData.iaInCharge);
    data.append("file1", file1);
    data.append("file2", file2);
    data.append("file3", file3);
    data.append("file4", file4);
    data.append("file5", file5);
    data.append("file6", file6);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        setFile1("");
        setFile2("");
        setFile3("");
        setFile4("");
        setFile5("");
        setFile6("");
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
      <input type="hidden" {...register("reportId")} />
      <div className="form-col">
        <SelectFromOptions
          register={register}
          options={selectOptions.reportingQuarter}
          label="Reporting Quarter"
          name="reportingQuarter"
          errorMessage={reportingQuarter?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.monthNames}
          label="Month Of Audit"
          name="monthOfAudit"
          errorMessage={monthOfAudit?.message}
        />
        <SelectFromDb
          control={control}
          label="Department"
          path="/departments/select"
          name="departmentId"
          errorMessage={departmentId?.message}
        />

        <SelectFromDb
          control={control}
          label="Branch Name"
          path="/branches/select"
          name="branchId"
          errorMessage={branchId?.message}
        />
        {/* <SelectFromDb
          control={control}
          label="Region"
          path="/regions/select"
          name="regionId"
          errorMessage={regionId?.message}
        /> */}
        <SelectFromOptions
          register={register}
          options={selectOptions.detectionMethod}
          label="Detection Method"
          name="detectionMethod"
          errorMessage={detectionMethod?.message}
        />

        <SelectFromDb
          control={control}
          label="Type of Fraud"
          path="/typeOfFraud/select"
          name="typeOfFraudId"
          errorMessage={typeOfFraudId?.message}
        />
        <Input
          name="whoMightBeInvolved"
          label="Who might be involved?"
          type="text"
          register={register}
          errorMessage={whoMightBeInvolved?.message}
        />
        <Input
          name="positionOfFraudster"
          label="Position of Fraudster"
          type="text"
          register={register}
          errorMessage={positionOfFraudster?.message}
        />
        <Input
          name="lengthOfServiceOfFraudster"
          label="Length of Service of fraudster(Month)"
          type="text"
          register={register}
          errorMessage={lengthOfServiceOfFraudster?.message}
        />
        <Input
          name="howIsTheFraudBeingPerpetrated"
          label="How is the fraud being perpetrated?"
          type="text"
          register={register}
          errorMessage={howIsTheFraudBeingPerpetrated?.message}
        />
        <Input
          name="numberOfOccurences"
          label="Number of occurences"
          type="text"
          register={register}
          errorMessage={numberOfOccurences?.message}
        />
        <Input
          name="potentialWitness"
          label="Potential Witness"
          type="text"
          register={register}
          errorMessage={potentialWitness?.message}
        />
        {/* <SelectFromOptions
          register={register}
          options={selectOptions.documentReview}
          label="Document Review 1"
          name="documentReview1"
          errorMessage={documentReview1?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.documentReview}
          label="Document Review 2"
          name="documentReview2"
          errorMessage={documentReview2?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.documentReview}
          label="Document Review 3"
          name="documentReview3"
          errorMessage={documentReview3?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.documentReview}
          label="Document Review 4"
          name="documentReview4"
          errorMessage={documentReview4?.message}
        /> */}
        <TextArea
          name="observations"
          label="Observations"
          control={control}
          errorMessage={observations?.message}
        />
        <Input
          name="defectiveControlsIdentified"
          label="Defective controls identified"
          type="text"
          register={register}
          errorMessage={defectiveControlsIdentified?.message}
        />
        <Input
          name="estimatedFraudLoss"
          label="Estimated Fraud Loss"
          type="text"
          register={register}
          errorMessage={estimatedFraudLoss?.message}
        />
        <Input
          name="recommendations"
          label="Recommendations"
          type="text"
          register={register}
          errorMessage={recommendations?.message}
        />
        <Input
          name="managementResponse"
          label="Measures taken by Management"
          type="text"
          register={register}
          errorMessage={managementResponse?.message}
        />
        <SelectFromDb
          control={control}
          label="Implemented By"
          path={`/employees/SelectbyRmOmCtl/${
            branchSelectId === "" ? 0 : branchSelectId
          }`}
          name="implementedBy"
          errorMessage={implementedBy?.message}
        />
        <SelectFromDb
          control={control}
          label="FMPU In Charge"
          path="/employees/SelectFmpu"
          name="iaInCharge"
          errorMessage={iaInCharge?.message}
        />
        <Input
          name="amountRecovered"
          label="Amount Recovered"
          type="text"
          register={register}
          errorMessage={amountRecovered?.message}
        />

        <SelectFromOptions
          register={register}
          options={["Open", "Closed"]}
          name="status"
          label="Status"
          errorMessage={status?.message}
        />

        <Input
          name="currentStatusUpdate"
          label="Current Status Update"
          type="text"
          register={register}
          errorMessage={currentStatusUpdate?.message}
        />
        <InputFile
          name="file1"
          label=" Evidance 1 "
          register={register}
          action={setFile1}
          errorMessage={file1?.message}
          evidence={defaultValues.evidence1}
        />
        <InputFile
          name="file2"
          label="Evidance 2 "
          register={register}
          action={setFile2}
          errorMessage={file2?.message}
          evidence={defaultValues.evidence2}
        />
        <InputFile
          name="file3"
          label="Evidance 3"
          register={register}
          action={setFile3}
          errorMessage={file3?.message}
          evidence={defaultValues.evidence3}
        />
        <InputFile
          name="file4"
          label="Evidance 4"
          register={register}
          action={setFile4}
          errorMessage={file4?.message}
          evidence={defaultValues.evidence4}
        />
        <InputFile
          name="file5"
          label="Evidance 5"
          register={register}
          action={setFile5}
          errorMessage={file5?.message}
          evidence={defaultValues.evidence5}
        />
        <InputFile
          name="file6"
          label="Evidance 6"
          register={register}
          action={setFile6}
          errorMessage={file6?.message}
          evidence={defaultValues.evidence6}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default FmpuForm;
