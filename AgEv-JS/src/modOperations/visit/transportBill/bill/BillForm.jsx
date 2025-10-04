import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import DatePicker from "../../../../components/DatePicker";
import { usePostData } from "../../../../hooks/dataApi";
import SaveButton from "../../../../components/button/SaveButton";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import TextArea from "../../../../components/TextArea";
import { SelectFromDb } from "../../../../components/SelectList";
import Input from "../../../../components/Input";
import InputFile from "../../../../components/InputFile";
// import InputFileOther from "../../../../components/InputFileOther";

const schema = yup
  .object({
    travelId: yup.string().max(50),
    travelingDate: yup.date().required("Required"),
    remarks: yup.string().required("Required").max(2500),
    checkedBy: yup.string().required("Required").max(50),
    managerId: yup.string().required("Required").max(50),
    title: yup.string().max(50),
  })
  .shape({
    file: yup
      .mixed()
      .test("required", "You need to provide a file", (value) => {
        return value && value.length;
      }),
  });

const BillForm = ({ defaultValues, action, btnText, path, returnPath }) => {
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
  const { travelingDate, remarks, managerId, checkedBy, title } = errors;

  const onSubmit = async (formData) => {
    // if (fileUrl === "") {
    //   toast.error("Upload not complete! Please wait.");
    //   return;
    // }
    setSubmitting(true);
    var tmpData = new FormData();
    tmpData.append("travelId", formData.travelId);
    tmpData.append("allVisitId", defaultValues.allVisitId);
    tmpData.append(
      "travelingDate",
      moment.utc(formData.travelingDate).local().format("YYYY-MM-DD")
    );
    tmpData.append("remarks", formData.remarks);
    tmpData.append("checkedBy", formData.checkedBy);
    tmpData.append("managerId", formData.managerId);
    tmpData.append("title", formData.title);
    tmpData.append("file", file);
    try {
      const { data, status } = await mutateAsync({
        path: path,
        formData: tmpData,
      });

      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        setFile("");
        navigate(`/ops/transportBill/preview/${data}`);
        // navigate(returnPath);
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
      <input type="hidden" {...register("travelId")} />

      <div className="form-col">
        <Controller
          control={control}
          name="travelingDate"
          render={({ field }) => (
            <DatePicker
              label="Travelling Date"
              field={field}
              errorMessage={travelingDate?.message}
              isRow={false}
            />
          )}
        />

        <SelectFromDb
          control={control}
          label="Checked By"
          path="/employees/selectOpsManager"
          name="checkedBy"
          errorMessage={checkedBy?.message}
        />
        <SelectFromDb
          control={control}
          label="Request for approval"
          path="/employees/selectOpsManager"
          name="managerId"
          errorMessage={managerId?.message}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full">
          <Input
            name="title"
            label="Document Title"
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
        </div>
        <TextArea
          name="remarks"
          label="Remarks"
          type="text"
          register={register}
          control={control}
          errorMessage={remarks?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default BillForm;
