import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SaveButton from "../../../components/button/SaveButton";
import { SelectFromDb, DataListFromDb } from "../../../components/SelectList";

const schema = yup.object({
  assignId: yup.string().max(50),
  pinName: yup.string().required("Required.").max(50),
});

const FeedbackAssignForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
  closeModal,
}) => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    reset,
    // control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { pinName } = errors;

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
        closeModal();
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
    <div>
      <form
        className=" h-auto bg-white rounded-md shadow-lg p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" {...register("assignId")} />
        <input type="hidden" {...register("feedbackId")} />
        <div className="form-col">
          {/* <SelectFromDb
            control={control}
            label="Employee Assign"
            path="/employees/select"
            name="employeeId"
            errorMessage={employeeId?.message}
          /> */}

          <DataListFromDb
            register={register}
            label="Request for Approval"
            path="/employees/select"
            name="pinName"
            errorMessage={pinName?.message}
          />
          <SaveButton btnText={btnText} disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default FeedbackAssignForm;
