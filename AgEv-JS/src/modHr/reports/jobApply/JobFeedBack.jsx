import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { usePostData } from "../../../hooks/dataApi";
import toast from "react-hot-toast";
import TextArea from "../../../components/TextArea";
import SaveButton from "../../../components/button/SaveButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  jobApplyId: yup.string().max(50),
  feedback: yup.string().required("Required.").max(50),
});

const JobFeedBack = ({ jobApplyId }) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();

  const {
    handleSubmit,
    reset,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { feedback } = errors;

  const onSubmit = async (formData) => {
    var data = new FormData();
    data.append("jobApplyId", jobApplyId);
    data.append("feedback", formData.feedback);

    setSubmitting(true);
    try {
      const { status } = await mutateAsync({
        path: "/Jobs/ApplyJobFeedback",
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
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
      // action={() => {}},
      setSubmitting(false);
    }
  };
  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          control={control}
          areaHeight="h-36"
          name="feedback"
          label="FeedBack"
          register={register}
          errorMessage={feedback?.message}
        />

        <div className="mt-2">
          <SaveButton btnText="Save" type="submit" disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default JobFeedBack;
