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
  detailsStatus: yup.string().max(50).required("Required"),
  remarks: yup.string().max(50).required("Required"),
  // ratingGiven: yup.string().max(50).required("Required"),
  // ownerAssigned: yup.string().max(50).required("Required"),
  // actionToBeTaken: yup.string().max(50).required("Required"),
  // actionCompletionDate: yup.date().required("Required"),
});

const BranchVisitDetailsForm = ({
  defaultValues,
  closeModal,
  branchVisitDetailsId,
  path,
  btntext,
}) => {
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
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
    detailsStatus,
    remarks,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();

    data.append("branchVisitDetailsId", branchVisitDetailsId);
    data.append("detailsStatus", formData.detailsStatus);
    data.append("remarks", formData.remarks);

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
          <TextArea
            control={control}
            name="remarks"
            label="Remarks"
            type="text"
            errorMessage={remarks?.message}
          />

          <SelectFromOptions
            register={register}
            options={["Closed", "Pending", "Done"]}
            label="Status"
            name="detailsStatus"
            errorMessage={detailsStatus?.message}
          />

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
