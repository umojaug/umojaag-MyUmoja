import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import moment from "moment";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import SaveButton from "../../components/button/SaveButton";
import TextArea from "../../components/TextArea";
import DatePicker from "../../components/DatePicker";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  requisitionApproveId: yup.string(),
  entryBy: yup.string().required("Required.").max(250),
  particulars: yup.string().required("Required.").max(250),
  approvedBy: yup.string().required("Required.").max(20),
  workDate: yup.string().required("Required."),
  amount: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
});

const RequisitionApproveForm = ({
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
  const { entryBy, particulars, amount, approvedBy, workDate } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();

    data.append("entryBy", formData.entryBy);
    data.append("particulars", formData.particulars);
    data.append("amount", formData.amount);
    data.append("approvedBy", formData.approvedBy);
    data.append(
      "workDate",
      moment.utc(formData.workDate).local().format("YYYY-MM-DD")
    );
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
        <Input
          name="entryBy"
          label="Entry By"
          type="text"
          register={register}
          sAutoFocus={true}
          errorMessage={entryBy?.message}
        />
        <Input
          name="amount"
          label="Amount"
          type="text"
          register={register}
          errorMessage={amount?.message}
        />
        <Input
          name="approvedBy"
          label="Approved By"
          type="text"
          register={register}
          errorMessage={approvedBy?.message}
        />
        <div className="flex items-center gap-x-3">
          <label htmlFor="approved">Approved</label>
          <input
            id="approved"
            name="approved"
            type="checkbox"
            {...register("approved")}
          />
        </div>
        <Controller
          control={control}
          name="workDate"
          render={({ field }) => (
            <DatePicker
              label="Work Date"
              field={field}
              isRow={false}
              errorMessage={workDate?.message}
            />
          )}
        />
        <TextArea
          control={control}
          name="particulars"
          label="Particulars"
          errorMessage={particulars?.message}
        />
        <SaveButton btnText="Save" disabled={submitting} />
      </div>
    </form>
  );
};

export default RequisitionApproveForm;
