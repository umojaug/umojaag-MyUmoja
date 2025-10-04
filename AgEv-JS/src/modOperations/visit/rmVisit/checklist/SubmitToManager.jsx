import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { usePostData } from "../../../../hooks/dataApi";
import TextArea from "../../../../components/TextArea";
import TopHeader from "../../../../components/TopHeader";

const schema = yup.object({
  rmVisitId: yup.string().required("Required.").max(50),
  submitRemarks: yup.string().required("Required.").max(2500),
});
const SubmitToManager = ({ action, id }) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rmVisitId: id,
      submitRemarks: "",
    },
    resolver: yupResolver(schema),
  });
  const { submitRemarks } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("rmVisitId", formData.rmVisitId);
    data.append("submitRemarks", formData.submitRemarks);
    try {
      const { status } = await mutateAsync({
        path: "/rmvisit/submit",
        formData: data,
      });
      if (status === 204) {
        toast.success("Successfully Submit!");
        navigate("/ops/rm/visit/list");
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
    <div>
      <TopHeader title="Please Write Submit Remarks" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("rmVisitId")} />
        <div className="form-col">
          <TextArea
            control={control}
            name="submitRemarks"
            label=""
            errorMessage={submitRemarks?.message}
            // isAutoFocus={true}
          />
          <button
            className="w-full btn-umojayellow"
            type="submit"
            disabled={submitting}
          >
            Submit To Manager
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitToManager;
