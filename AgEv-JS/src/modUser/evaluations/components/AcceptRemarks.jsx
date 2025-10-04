import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import toast from "react-hot-toast";
import TextArea from "../../../components/TextArea";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  evaluationId: yup.string().required("Required.").max(50),
  acceptRemarks: yup.string().required("Required.").max(2500),
});
const AcceptRemarks = ({ defaultValues, action }) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { acceptRemarks } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("evaluationId", formData.evaluationId);
    data.append("acceptRemarks", formData.acceptRemarks);
    try {
      const { status } = await mutateAsync({
        path: "/evaluation/accept",
        formData: data,
      });
      if (status === 204) {
        toast.success("Successfully accept!");
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
      navigate("/evaluation/second/review/list");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("evaluationId")} />
        <div className="px-0 pt-2 pb-0 mb-4 grid gap-2">
          <h3 className="text-xl text-gray-800 text-center font-medium">
            Are you sure you want to accept? This item will be accept
            immediately. You can't undo this action.
          </h3>
          <TextArea
            control={control}
            name="acceptRemarks"
            label="Please Write Accept Remarks"
            errorMessage={acceptRemarks?.message}
            isAutoFocus={true}
          />
          <div className="flex items-center justify-center">
            <button
              className="w-full btn-umojayellow"
              type="submit"
              disabled={submitting}
            >
              I Accept
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AcceptRemarks;
