import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import SaveButton from "../../../components/button/SaveButton";
import { SelectFromDb } from "../../../components/SelectList";
import InputFile from "../../../components/InputFile";

const schema = yup
  .object({
    courseId: yup.string().max(50),
    title: yup.string().required("Required.").max(250),
    refLink: yup.string().max(100),
    isPined: yup.bool(),
  })
  .shape({
    picture: yup.mixed(),
  });

const CourseForm = ({ defaultValues, action, btnText, path, returnPath }) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [imageUrl, setPhoto] = useState(defaultValues.imageUrl);

  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { categoryId, title, refLink, picture } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("courseId", formData.courseId);
    data.append("categoryId", formData.categoryId);
    data.append("title", formData.title);
    data.append("refLink", formData.refLink);
    data.append("imageUrl", imageUrl);
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
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
      <input type="hidden" {...register("courseId")} />
      <div className="form-col-3">
        <div>
          <img
            src={`https://drive.google.com/thumbnail?id=${imageUrl}`}
            alt=""
          />
          <InputFile
            name="picture"
            label="Upload Image"
            accept="image/*"
            register={register}
            action={setPhoto}
            errorMessage={picture?.message}
          />
        </div>
      </div>
      <div className="form-col">
        <SelectFromDb
          control={control}
          label="Category"
          path="/category/select"
          name="categoryId"
          errorMessage={categoryId?.message}
        />
        <Input
          name="title"
          label="Course title"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={title?.message}
        />
        <Input
          name="refLink"
          label="Course Link"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={refLink?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default CourseForm;
