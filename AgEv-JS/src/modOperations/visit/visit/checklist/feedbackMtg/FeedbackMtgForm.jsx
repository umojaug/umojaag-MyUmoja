import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../../../hooks/dataApi";
import SaveButton from "../../../../../components/button/SaveButton";
import { useNavigate } from "react-router-dom";
import TextArea from "../../../../../components/TextArea";
import InputFile from "../../../../../components/InputFile";
// import InputFile from "../../../../../components/InputFile";

const schema = yup
  .object({
    allFeedbackId: yup.number(),
    allVisitId: yup.string().required("Required.").max(50),
    nameOfAttendees: yup.string().max(500),
    discussedIssues: yup.string().required("Required.").max(4000),
    givenFeedback: yup.string().required("Required.").max(4000),
    remarks: yup.string().required("Required.").max(4000),
  })
  .shape({
    picture: yup.mixed(),
  });

const FeedbackMtgForm = ({
  defaultValues,
  returnPath,
  action,
  btnText,
  path,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
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
  const { nameOfAttendees, remarks, discussedIssues, givenFeedback } = errors;

  const onSubmit = async (formData) => {
    // if (file === "1vyhSgRVvN5Y7FaTX2HBLGse7i2BmkDN6" || "") {
    //   toast.error("Upload not complete! Please wait.");
    //   return;
    // }
    setSubmitting(true);
    var data = new FormData();
    data.append("allFeedbackId", formData.allFeedbackId);
    data.append("allVisitId", defaultValues.allVisitId);
    data.append("nameOfAttendees", formData.nameOfAttendees);
    data.append("discussedIssues", formData.discussedIssues);
    data.append("givenFeedback", formData.givenFeedback);
    data.append("remarks", formData.remarks);
    data.append("file", file);
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        setFile("");
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
      <input type="hidden" {...register("allFeedbackId")} />
      <div className="form-col">
        <TextArea
          control={control}
          name="discussedIssues"
          label="Issues Discussed"
          areaHeight="h-32"
          errorMessage={discussedIssues?.message}
          isAutoFocus={true}
        />
        <TextArea
          control={control}
          name="givenFeedback"
          label="Specific Feedback Given"
          areaHeight="h-32"
          errorMessage={givenFeedback?.message}
          isAutoFocus={true}
        />
        <TextArea
          control={control}
          name="remarks"
          label="Remarks"
          areaHeight="h-32"
          errorMessage={remarks?.message}
          isAutoFocus={true}
        />
        <TextArea
          control={control}
          name="nameOfAttendees"
          label="Name of Attendees"
          areaHeight="h-32"
          errorMessage={nameOfAttendees?.message}
          isAutoFocus={true}
        />
        <div className="form-col-3">
          <div>
            {/* <img
              src={`https://drive.google.com/thumbnail?id=${imageUrl}`}
              alt=""
            /> */}
            <InputFile
              name="file"
              register={register}
              action={setFile}
              errorMessage={file?.message}
            />
          </div>
        </div>
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default FeedbackMtgForm;
