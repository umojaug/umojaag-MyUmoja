import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SaveButton from "../../../components/button/SaveButton";
import { SelectFromDb } from "../../../components/SelectList";

const schema = yup.object({
  RegionId: yup.string().max(50),
  employeeId: yup.string().max(50),
});

const RmAsignForm = ({ defaultValues, action, btnText, path, returnPath }) => {
  const navigate = useNavigate();
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
  const { regionId, employeeId } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();

    data.append("regionId", formData.regionId);
    data.append("employeeId", formData.employeeId);
    // data.append("branchName", formData.branchName);
    // data.append(
    //   "startDate",
    //   moment.utc(formData.startDate).local().format("YYYY-MM-DD")
    // );
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
      <input type="hidden" {...register("amAsignId")} />
      <div className="form-col">
        <SelectFromDb
          control={control}
          label="Region"
          path="/regions/select"
          name="regionId"
          errorMessage={regionId?.message}
        />

        <SelectFromDb
          control={control}
          label="Regional Manager"
          path="/employees/SelectRegionManager"
          name="employeeId"
          errorMessage={employeeId?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default RmAsignForm;
