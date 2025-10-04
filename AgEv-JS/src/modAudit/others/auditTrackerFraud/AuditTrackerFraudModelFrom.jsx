/* eslint-disable react/prop-types */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { SelectFromOptions } from "../../../components/SelectList";
import { usePostData } from "../../../hooks/dataApi";
import TextArea from "../../../components/TextArea";

const schema = yup.object({
  status: yup.string().max(50).required("Required"),
  comments: yup.string().max(250),
});

const AuditTrackerFraudModelFrom = ({
  defaultValues,
  closeModal,
  path,
  titleText,
}) => {
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);

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
  const { comments, status } = errors;

  const onSubmit = async (formData) => {
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        // addCreateNew === false && closeModal();
      }
      if (status === 204) {
        toast.success("Update successful!");
        closeModal();
        // navigate(returnPath);
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
    <div className="w-full h-auto bg-white rounded-md shadow-lg p-6">
      <div className="w-1/3 pr-4 border-r border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {titleText}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectFromOptions
          register={register}
          options={["Open", "In progress", "Closed"]}
          label="Status"
          name="status"
          errorMessage={status?.message}
        />

        <TextArea
          control={control}
          name="comments"
          label="Comments"
          type="text"
          errorMessage={comments?.message}
        />

        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuditTrackerFraudModelFrom;
