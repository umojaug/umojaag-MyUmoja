import React, { useState } from "react";
import Input from "../../../components/Input";
import { useForm } from "react-hook-form";
import { usePostData } from "../../../hooks/dataApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import InputFile from "../../../components/InputFile";

const schema = yup
  .object({
    courseId: yup.string().max(50),
    title: yup.string().required("Required.").max(50),
  })
  .shape({
    file: yup
      .mixed()
      .test("required", "You need to provide a file", (value) => {
        return value && value.length;
      }),
    // .test("fileSize", "The file is too large", (value, context) => {
    //   return value && value[0] && value[0].size <= 200000;
    // }),
    // .test("type", "We only support jpeg", function (value) {
    //   return value && value[0] && value[0].type === "image/jpeg";
    // }),
  });

const ContentAdd = ({ courseId, action }) => {
  const defaultValues = {
    courseId: courseId,
    title: "",
  };
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { title } = errors;
  const onSubmit = async (formData) => {
    // if (fileUrl === "") {
    //   toast.error("Upload not complete! Please wait.");
    //   return;
    // }
    setSubmitting(true);
    var data = new FormData();
    data.append("courseId", formData.courseId);
    data.append("title", formData.title);
    data.append("file", file);
    try {
      const { status } = await mutateAsync({
        path: "/hrcontent/create",
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        setFile("");
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-200 my-3 p-2 rounded-lg"
    >
      <input type="hidden" {...register("courseId")} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        <Input
          name="title"
          label="Document Type"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={title?.message}
          showPlaceHolder={true}
        />
        <InputFile
          name="file"
          register={register}
          action={setFile}
          errorMessage={file?.message}
        />
        <div className="w-24 grid content-center place-self-end">
          <button
            type="submit"
            className="btn-umojayellow w-full"
            disabled={submitting}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContentAdd;
