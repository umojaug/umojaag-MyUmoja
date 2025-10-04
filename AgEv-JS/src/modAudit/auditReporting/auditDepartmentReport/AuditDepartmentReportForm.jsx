import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import SaveButton from "../../../components/button/SaveButton";
import { selectOptions } from "../../../data/selectOptions";
import {
  SelectFromDb,
  SelectFromOptions,
} from "../../../components/SelectList";

import TextArea from "../../../components/TextArea";

const schema = yup.object({
  reportId: yup.string().max(255),
  reportingQuarter: yup.string().required("Required"),
  monthOfAudit: yup.string().required("Required").max(50),
  departmentId: yup.string().required("Required").max(50),
  departmentOverview: yup.string().required("Required").max(4000),
});

const AuditDepartmentReportForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  // const [appendicies, setPhoto] = useState("");

  const {
    register,
    handleSubmit,
    control,
    // watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const { monthOfAudit, departmentId, reportingQuarter, departmentOverview } =
    errors;
  // const departmentSelectId = watch("departmentId", defaultValues.departmentId);

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("reportId", formData.reportId);
    data.append("reportingQuarter", formData.reportingQuarter);
    data.append("monthOfAudit", formData.monthOfAudit);
    data.append("departmentId", formData.departmentId);
    data.append("departmentOverview", formData.departmentOverview);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
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
      action();
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("reportId")} />

      <div className="form-col">
        <SelectFromOptions
          register={register}
          options={selectOptions.reportingQuarter}
          label="Reporting Quarter"
          name="reportingQuarter"
          errorMessage={reportingQuarter?.message}
        />
        <SelectFromOptions
          register={register}
          options={selectOptions.monthNames}
          label="Month Of Audit"
          name="monthOfAudit"
          errorMessage={monthOfAudit?.message}
        />

        <SelectFromDb
          control={control}
          label="Department"
          path="/departments/select"
          name="departmentId"
          errorMessage={departmentId?.message}
        />
        <TextArea
          control={control}
          areaHeight="h-36"
          name="departmentOverview"
          label="Department Overview"
          register={register}
          errorMessage={departmentOverview?.message}
        />
      </div>

      <div className="form-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AuditDepartmentReportForm;
