import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import { DataListFromDb, SelectFromDb } from "../../../components/SelectList";
import SaveButton from "../../../components/button/SaveButton";

const schema = yup.object({
  pinName: yup.string().required("Required").max(50),
  designationId: yup.string().required("Required").max(50),
});

function DesignationForm({ path, returnPath }) {
  const navigate = useNavigate();
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pinName: "",
      designationId: "",
    },
    resolver: yupResolver(schema),
  });

  const { pinName, designationId } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    var data = new FormData();
    data.append("pinName", formData.pinName);
    data.append("designationId", formData.designationId);

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
          label="Designation"
          path="/DesignationChange/select"
          name="designationId"
          errorMessage={designationId?.message}
        />
      </div>
      <div className="from-cols mt-4">
        <SaveButton btnText="Save" disabled={submitting} />
      </div>
    </form>
  );
}

export default DesignationForm;
