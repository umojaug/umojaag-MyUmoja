import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetData, usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import { SelectFromDb, SelectFromOptions } from "../../components/SelectList";
import TextArea from "../../components/TextArea";
// import SelectMultipleItem from "../../components/SelectMultipleItem";
import MultiFileUpload from "../../components/MultiFileUpload";
import TextEditor from "../../components/TextEditor";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  projectId: yup.string().required("project is required"),
  categoryId: yup.string().required("Ticket Category is required"),
  ticketType: yup.string().required("Ticket Type is required"),
  priority: yup.string().required("Priority is required"),
  status: yup.string().required("Status is required"),
  supportingDocLink: yup.string().notRequired().nullable().url("Invalid URL"),
});

const TicketForm = ({ defaultValues, action, btnText, path, returnPath }) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [imagePaths, setImagePaths] = useState([
    defaultValues.file1Path || null,
    defaultValues.file2Path || null,
  ]);
  // const [removeImagePaths, setRemoveImagePaths] = useState([]);
  const [currentPreSelectedUsers, setCurrentPreSelectedUsers] = useState(
    defaultValues.assigneeIds || []
  );

  const { mutateAsync } = usePostData();
  // const {
  //   data: list,
  //   error,
  //   isLoading,
  //   isError,
  // } = useGetData("userList", "/user/select");

  // const userOptions =
  //   list?.data.map((user) => ({
  //     value: user.listId,
  //     label: user.listName,
  //   })) || [];

  const preSelectedUsers = currentPreSelectedUsers
    ?.map((userId) => {
      const user = userOptions.find((option) => option.value === userId);
      return user ? user : null;
    })
    .filter(Boolean);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    title,
    description,
    supportingDocFiles,
    supportingDocLink,
    projectId,
    categoryId,
    ticketType,
    priority,
    status,
    assigneeIds,
    remarks,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    setCurrentPreSelectedUsers(formData.assigneeIds);
    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "supportingDocFiles") {
          formData.supportingDocFiles.forEach((file, index) => {
            formDataToSend.append(`file${index + 1}`, file);
          });
        } else if (key === "assigneeIds") {
          formDataToSend.append(
            "assigneeIds",
            formData.assigneeIds.map((user) => user.value)
          );
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      // formDataToSend.append("removeImagePaths", removeImagePaths);
      // formDataToSend.forEach((value, key) => {
      //   console.log(key, value);
      // });
      const { status } = await mutateAsync({
        path: path,
        formData: formDataToSend,
      });

      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        navigate(returnPath);
      }
      if (status === 204) {
        reset({
          ticketId: "",
          title: "",
          description: "",
          supportingDocLink: "",
          projectId: "",
          categoryId: "",
          ticketType: "",
          priority: "",
          status: "",
          assigneeIds: [],
          remarks: "",
        });
        toast.success("Update successful!");
        setTimeout(() => {
          navigate(returnPath);
        }, 500);
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

  // const handleRemoveImage = (index) => {
  //   setImagePaths((prev) => {
  //     const updatedPaths = [...prev];
  //     if (updatedPaths[index]) {
  //       setRemoveImagePaths((prevRemoved) => [
  //         ...prevRemoved,
  //         updatedPaths[index],
  //       ]);
  //     }
  //     updatedPaths[index] = null;
  //     return updatedPaths;
  //   });
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("ticketId")} />
      <Input
        name="title"
        label="Title"
        type="text"
        register={register}
        errorMessage={title?.message}
      />

      {/* <TextArea
        control={control}
        name="description"
        label="Description"
        register={register}
        errorMessage={description?.message}
      /> */}
      <div className="relative">
        <TextEditor
          control={control}
          name="description"
          label="Description"
          errorMessage={description?.message}
        />
      </div>
      <Input
        name="supportingDocLink"
        label="Supporting Document Link"
        type="text"
        register={register}
        errorMessage={supportingDocLink?.message}
      />
      <>
        <MultiFileUpload
          label="Upload Supporting Document"
          onFilesChange={(files) => setValue("supportingDocFiles", files)}
          errorMessage={supportingDocFiles?.message}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
            "application/pdf": [".pdf"],
            // "text/html": [".html", ".htm"],
          }}
          maxFiles={2}
        />
        <div className="flex justify-center items-center mt-4 space-x-4">
          {imagePaths.map((path, index) =>
            path ? (
              <div
                key={index}
                className="flex h-[150px] justify-center w-[150px] items-center relative"
              >
                <img
                  src={`https://drive.google.com/thumbnail?id=${path}`}
                  alt={`File ${index + 1}`}
                  className="h-full rounded-lg shadow-lg w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* <button
                  type="button"
                  className="bg-red-500 rounded-full text-white text-xs absolute px-2 py-1 right-2 top-2"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button> */}
              </div>
            ) : null
          )}
        </div>
      </>

      <SelectFromDb
        control={control}
        name="projectId"
        label="Project"
        path="/Project/select"
        errorMessage={projectId?.message}
      />
      <SelectFromDb
        control={control}
        name="categoryId"
        label="Category"
        path="/Categories/select"
        errorMessage={categoryId?.message}
      />

      <SelectFromOptions
        register={register}
        options={["New", "Recurring"]}
        label="Ticket Type"
        name="ticketType"
        errorMessage={ticketType?.message}
      />

      <SelectFromOptions
        register={register}
        options={["High", "Medium", "Low"]}
        label="Priority"
        name="priority"
        errorMessage={priority?.message}
      />

      <SelectFromOptions
        register={register}
        options={["Open", "In Progress", "Closed"]}
        label="Status"
        name="status"
        errorMessage={status?.message}
      />

      {/* <SelectMultipleItem
        control={control}
        options={userOptions}
        label="Assigned To"
        name="assigneeIds"
        errorMessage={assigneeIds?.message}
        preSelectedUsers={preSelectedUsers}
        setValue={setValue}
      /> */}

      <TextArea
        control={control}
        name="remarks"
        label="Remarks"
        register={register}
        errorMessage={remarks?.message}
      />
      <div className="mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default TicketForm;
