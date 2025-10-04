import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SaveButton from "../../../components/button/SaveButton";
import {
  SelectFromCheckBox,
  SelectFromDb,
} from "../../../components/SelectList";

const schema = yup.object({
  mgtMappingId: yup.string().max(50),
  designationId: yup.string().required("Required."),
  mappedTo: yup.string().required("Required.").max(50),
  managerFirst: yup.string().required("Required."),
  managerSecond: yup.string().required("Required."),
});

const ManagerMappingForm = ({
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
  const { designationId, mappedTo, managerFirst, managerSecond } = errors;

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
        <SelectFromDb
          control={control}
          label="Select Designation"
          path="/designations/select"
          name="designationId"
          errorMessage={designationId?.message}
        />
        <SelectFromCheckBox
          register={register}
          label="Mapped To"
          options={["In Country", "Global"]}
          name="mappedTo"
          errorMessage={mappedTo?.message}
        />
        <SelectFromDb
          control={control}
          label="Select Manager First"
          path="/designations/select"
          name="managerFirst"
          errorMessage={managerFirst?.message}
        />
        <SelectFromDb
          control={control}
          label="Select Manager Second"
          path="/designations/select"
          name="managerSecond"
          errorMessage={managerSecond?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default ManagerMappingForm;
