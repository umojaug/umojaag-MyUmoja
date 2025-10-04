import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import SaveButton from "../../../components/button/SaveButton";
import moment from "moment";
import DatePicker from "../../../components/DatePicker";
import { SelectFromDb } from "../../../components/SelectList";

const schema = yup.object({
  dpInvestigationId: yup.string().max(50),
  title: yup.string().required("Required").max(50),
  // branchId: yup.string().required("Required").max(50),
  departmentId: yup.string().required("Required").max(50),
  // testSteps: yup.string().max(50),
  investigationDate: yup.date().required("Required"),
});

const DepartmentalInvestigationForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { title, departmentId, investigationDate } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var datainfo = new FormData();
    datainfo.append("dpInvestigationId", formData.dpInvestigationId);
    datainfo.append("title", formData.title);
    datainfo.append("departmentId", formData.departmentId);
    datainfo.append(
      "investigationDate",
      moment.utc(formData.investigationDate).local().format("YYYY-MM-DD")
    );

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: datainfo,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
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
      // action();
      // setSubmitting(false);
    }
  };

  const departmentSelectId = watch("departmentId", defaultValues.departmentId);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("dpInvestigationId")} />

      <div className="form-col">
        <Input
          name="title"
          label="Title"
          type="text"
          register={register}
          errorMessage={title?.message}
        />

        <SelectFromDb
          control={control}
          label="Department"
          path="/departments/select"
          name="departmentId"
          errorMessage={departmentId?.message}
        />

        <Controller
          control={control}
          name="investigationDate"
          render={({ field }) => (
            <DatePicker
              label="Audit Date"
              field={field}
              errorMessage={investigationDate?.message}
            />
          )}
        />
      </div>

      <div className="from-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default DepartmentalInvestigationForm;
