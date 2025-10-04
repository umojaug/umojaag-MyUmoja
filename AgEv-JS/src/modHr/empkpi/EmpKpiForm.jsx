import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SaveButton from "../../components/button/SaveButton";
import { DataListFromDb, SelectFromDb } from "../../components/SelectList";
import TextArea from "../../components/TextArea";

const schema = yup.object({
  pinName: yup.string().required("Required").max(50),
  kpiId: yup.string().required("Required").max(50),
  particulars: yup.string().required("Required").max(4000),
});

function EmpKpiForm({ defaultValues, action, btnText, path, returnPath }) {
  const navigate = useNavigate();
  const { mutateAsync, reset } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { pinName, KpiId, particulars } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
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
      <div className="form-col">
        <DataListFromDb
          register={register}
          label="Employee"
          path="/employees/select"
          name="pinName"
          errorMessage={pinName?.message}
        />
        <SelectFromDb
          control={control}
          label="Kpi Type"
          path="/Kpi/select"
          name="KpiId"
          errorMessage={KpiId?.message}
        />
        <TextArea
          name="particulars"
          label="Particulars"
          control={control}
          errorMessage={particulars?.message}
        />
      </div>
      <div className="from-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
}

export default EmpKpiForm;
