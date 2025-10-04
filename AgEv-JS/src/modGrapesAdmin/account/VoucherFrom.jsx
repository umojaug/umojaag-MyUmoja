/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../hooks/dataApi";
import Input from "../../components/Input";

const schema = yup.object({
  voucherNumber: yup.string().required("Required.").max(50),
});

const TractionIssueFrom = ({ defaultValues, closeModal, path, titleText }) => {
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const [addCreateNew, setAddCreateNew] = useState(false);

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
  const { voucherNumber } = errors;

  const onSubmit = async (formData) => {
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        addCreateNew === false && closeModal();
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
    <div className="flex w-full h-auto rounded-md p-6">
      <div className="w-1/3 pr-4 border-r">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {titleText}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 pl-4 space-y-4">
        <Input
          name="voucherNumber"
          label="Voucher Number"
          type="text"
          register={register}
          errorMessage={voucherNumber?.message}
        />

        <button
          type="submit"
          disabled={submitting}
          value={false}
          className="px-4 py-2 bg-danger text-white rounded-md hover:bg-danger/80"
          onClick={() => setAddCreateNew(false)}
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default TractionIssueFrom;
