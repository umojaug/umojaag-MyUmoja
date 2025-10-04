import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import InputFile from "../../components/InputFile";
import { SelectFromDb } from "../../components/SelectList";

const schema = yup
  .object({
    documentsId: yup.string().max(50),
    categoryId: yup.string().required("Required.").max(50),
    title: yup.string().required("Required.").max(250),
  })
  .shape({
    picture: yup
      .mixed()
      .required()
      .test("required", "You need to provide a file", (value) => {
        return value && value.length;
      }),

  });

const DocumentsForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
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
  const { title, categoryId, picture } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("title", formData.title);
    // data.append("categoryId", formData.categoryId);
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
      <input type="hidden" {...register("documentsId")} />
      <div className="form-col">
        <Input
          name="title"
          label="Title"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={title?.message}
        />

        {/* <SelectFromDb
          control={control}
          label="Department"
          path="/documentsCategory/select"
          name="categoryId"
          errorMessage={categoryId?.message}
        /> */}

        <InputFile
          name="picture"
          label="Upload Image"
          register={register}
          action={setFile}
          errorMessage={picture?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default DocumentsForm;
