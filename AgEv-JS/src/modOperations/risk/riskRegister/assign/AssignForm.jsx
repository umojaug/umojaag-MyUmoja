/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../hooks/dataApi";
import {
  SelectFromDb,
  SelectFromOptions,
} from "../../../../components/SelectList";

const schema = yup.object({
  // vtoId: yup.string().max(50),
  // fileName: yup.string().max(50).required("Required"),
  // folderId: yup.string().max(50).required("Required"),
});

const AssignForm = ({ defaultValues, closeModal, riskRegisterId, path }) => {
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
  const { principleRisks, employeeId } = errors;

  console.log("dkkdkd", riskRegisterId);

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();

    data.append("riskRegisterId", riskRegisterId);
    data.append("principleRisks", formData.principleRisks);
    data.append("employeeId", formData.employeeId);

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
        // navigate(returnPath);
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
      // action();
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
          <SelectFromDb
            control={control}
            label="Assigned Risk Owner"
            path="/employees/SelectAssignedRiskOwner"
            name="employeeId"
            errorMessage={employeeId?.message}
          />
          <SelectFromOptions
            register={register}
            options={[
              "Strategy Risk",
              "Credit Risk",
              "Operational Risk",
              "Financial Risk",
              "People Risk",
              "Governance, Risk and Compliance",
              "Legal and Regulatory Risk",
              "Health and Safety Risk",
            ]}
            label="Principle Risks"
            name="principleRisks"
            errorMessage={principleRisks?.message}
          />

          <div className="flex justify-end mt-1">
            <button
              disabled={submitting}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AssignForm;
