import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SaveButton from "../../../components/button/SaveButton";
import { SelectFromDb } from "../../../components/SelectList";

const schema = yup.object({
  focalId: yup.string(),
  departmentId: yup.string().required("Required.").max(50),
  employeeId: yup.string().required("Required.").max(50),
});

const DepartmentFocalForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
}) => {
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
  const { departmentId, employeeId } = errors;

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
      <input type="hidden" {...register("focalId")} />
      <div className="form-col">
        <SelectFromDb
          control={control}
          label="Department"
          path="/departments/select"
          name="departmentId"
          errorMessage={departmentId?.message}
        />
        <SelectFromDb
          control={control}
          label="Select Manager"
          path="/employees/Select"
          name="employeeId"
          errorMessage={employeeId?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default DepartmentFocalForm;
