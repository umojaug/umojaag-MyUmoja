import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import {
  SelectFromDb,
  SelectFromOptions,
} from "../../../components/SelectList";
import { selectOptions } from "../../../data/selectOptions";
import SaveButton from "../../../components/button/SaveButton";
import Input from "../../../components/Input";
import { AiOutlineFile } from "react-icons/ai";
import InputFile from "../../../components/InputFile";

const schema = yup.object({
  reportId: yup.string().max(255),
  reportingQuarter: yup.string().max(300).required("Required."),
  monthOfAudit: yup.string().max(300).required("Required."),
  departmentId: yup.string().max(300).required("Required."),
  branchId: yup.string().max(50).required("Required."),
  detectionMethod: yup.string().max(300).required("Required."),
  typeOfFraudId: yup.string().max(50).required("Required."),
  whoMightBeInvolved: yup.string().max(300).required("Required."),
  positionOfFraudster: yup.string().max(300).required("Required."),
  lengthOfServiceOfFraudster: yup.string().max(50).required("Required."),
  howIsTheFraudBeingPerpetrated: yup.string().max(300).required("Required."),
  numberOfOccurences: yup.string().max(300).required("Required."),
  potentialWitness: yup.string().max(300).required("Required."),
  observations: yup.string().max(300).required("Required."),
  defectiveControlsIdentified: yup.string().max(300).required("Required."),
  estimatedFraudLoss: yup.string().max(300).required("Required."),
  recommendations: yup.string().max(300).required("Required."),
  managementResponse: yup.string().max(300).required("Required."),
  implementedBy: yup.string().max(300).required("Required."),
  iaInCharge: yup.string().max(300).required("Required."),
  amountRecovered: yup.string().max(50),
  status: yup.string().max(50),
  currentStatusUpdate: yup.string().max(50),
});

const AuditSpecialInvestigationReportForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

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

  const branchSelectId = watch("branchId", defaultValues.branchId);

  const {
    reportingQuarter,
    monthOfAudit,
    departmentId,
    branchId,
    detectionMethod,
    typeOfFraudId,
    whoMightBeInvolved,
    positionOfFraudster,
    lengthOfServiceOfFraudster,
    howIsTheFraudBeingPerpetrated,
    numberOfOccurences,
    potentialWitness,
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

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();

    data.append("reportId", formData.reportId);
    data.append("reportingQuarter", formData.reportingQuarter);
    data.append("monthOfAudit", formData.monthOfAudit);
    data.append("departmentId", formData.departmentId);
    data.append("branchId", formData.branchId);

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
    data.append("evidence", formData.evidence);
    data.append("observations", formData.observations);
    data.append(
      "defectiveControlsIdentified",
      formData.defectiveControlsIdentified
    );
    data.append("estimatedFraudLoss", formData.estimatedFraudLoss);
    data.append("recommendations", formData.recommendations);
    data.append("managementResponse", formData.managementResponse);
    data.append("implementedBy", formData.implementedBy);
    data.append("iaInCharge", formData.iaInCharge);
    data.append("amountRecovered", formData.amountRecovered);
    data.append("status", formData.status);
    data.append("currentStatusUpdate", formData.currentStatusUpdate);
    data.append("file1", file1);
    data.append("file2", file2);

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

        <div className="flex w-full">
          <InputFile
            name="file1"
            register={register}
            action={setFile1}
            errorMessage={file1?.message}
          />
          <div className="text-xs ml-2">
            {defaultValues.statements !== "" ? (
              <a
                href={defaultValues.statements}
                className="btn-success w-12 h-10"
              >
                <AiOutlineFile size={24} />
              </a>
            ) : (
              <></>
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
            {defaultValues.evidence1 !== "" ? (
              <a
                href={defaultValues.evidence1}
                className="btn-success w-12 h-10"
              >
                <AiOutlineFile size={24} />
              </a>
            ) : (
              <></>
            )}
            {/* <label>{file}</label> */}
          </div>
        </div>
        <Input
          name="observations"
          label="Observations"
          type="text"
          register={register}
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
          label="Estimated fraud loss"
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
          path={`/employees/SelectbyRmAm/${branchSelectId}`}
          name="implementedBy"
          errorMessage={implementedBy?.message}
        />

        <SelectFromDb
          control={control}
          label="IA In Charge"
          path="/employees/SelectAuditor"
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
      </div>

      <div className="form-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AuditSpecialInvestigationReportForm;
