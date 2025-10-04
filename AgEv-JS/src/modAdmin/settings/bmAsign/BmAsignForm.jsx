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
  branchId: yup.string().required("Required.").max(50),
  employeeId: yup.string().required("Required.").max(50),
});

const BmAsignForm = ({ defaultValues, action, btnText, path, returnPath }) => {
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
  const { branchId, employeeId } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();

    data.append("branchId", formData.branchId);
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
      <input type="hidden" {...register("branchId")} />
      <div className="form-col">
        <SelectFromDb
          control={control}
          label="Branch Name"
          path="/branches/select"
          name="branchId"
          errorMessage={branchId?.message}
        />

        <SelectFromDb
          control={control}
          label="Branch Manager"
          path="/employees/SelectBranchManager"
          name="employeeId"
          errorMessage={employeeId?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default BmAsignForm;
