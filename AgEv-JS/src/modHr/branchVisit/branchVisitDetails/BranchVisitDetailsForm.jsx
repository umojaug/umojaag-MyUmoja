import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import Input from "../../../components/Input";
import InputFile from "../../../components/InputFile";
import DatePicker from "../../../components/DatePicker";
import moment from "moment";
import TextArea from "../../../components/TextArea";
import {
  SelectAllFromDb,
  SelectFromOptions,
} from "../../../components/SelectList";

const schema = yup.object({
  // vtoId: yup.string().max(50),
  topicAssessed: yup.string().max(50).required("Required"),
  findings: yup.string().max(50).required("Required"),
  ratingGiven: yup.string().max(50).required("Required"),
  ownerAssigned: yup.string().max(50).required("Required"),
  actionToBeTaken: yup.string().max(50).required("Required"),
  actionCompletionDate: yup.date().required("Required"),
});

const BranchVisitDetailsForm = ({
  defaultValues,
  closeModal,
  branchVisitId,
  path,
  btntext,
}) => {
  const { mutateAsync } = usePostData();
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  console.log(branchVisitId);
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
    // branchVisitId,
    topicAssessed,
    findings,
    ratingGiven,
    ownerAssigned,
    actionToBeTaken,
    actionCompletionDate,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();

    data.append("branchVisitId", branchVisitId);
    data.append("topicAssessed", formData.topicAssessed);
    data.append("findings", formData.findings);
    data.append("ratingGiven", formData.ratingGiven);
    data.append("ownerAssigned", formData.ownerAssigned);
    data.append("actionToBeTaken", formData.actionToBeTaken);

    data.append(
      "actionCompletionDate",
      moment.utc(formData.actionCompletionDate).local().format("YYYY-MM-DD")
    );

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        closeModal();
        reset();
      }
      if (status === 204) {
        toast.success("Update successful!");
        closeModal();
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
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="topicAssessed"
            label="Topic Assessed"
            type="text"
            register={register}
            errorMessage={topicAssessed?.message}
          />

          <TextArea
            control={control}
            name="findings"
            label="Findings"
            type="text"
            errorMessage={findings?.message}
          />

          <SelectFromOptions
            register={register}
            options={["Excellent", "Satisfactory", "Needs Improvement"]}
            label="Rating"
            name="ratingGiven"
            errorMessage={ratingGiven?.message}
          />

          <Input
            name="actionToBeTaken"
            label="Action To Be Taken"
            type="text"
            register={register}
            errorMessage={actionToBeTaken?.message}
          />

          <SelectAllFromDb
            control={control}
            label="Action Owner Assigned"
            path="/employees/select"
            name="ownerAssigned"
            errorMessage={ownerAssigned?.message}
          />

          <Controller
            control={control}
            name="actionCompletionDate"
            render={({ field }) => (
              <DatePicker
                label="Action Completion Date"
                field={field}
                errorMessage={actionCompletionDate?.message}
                isRow={false}
              />
            )}
          />

          <InputFile
            name="file"
            register={register}
            action={setFile}
            errorMessage={file?.message}
          />
          {/* <div className="text-xs ml-2">
            {defaultValues.fileUrl !== "" ? (
              <a href={defaultValues.fileUrl} className="btn-success w-12 h-10">
                <AiOutlineFile size={24} />
              </a>
            ) : (
              <></>
            )}
          </div> */}

          <div className="flex justify-end mt-2">
            <button
              disabled={submitting}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {btntext}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchVisitDetailsForm;
