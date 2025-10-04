import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SaveButton from "../../../../../components/button/SaveButton";
import Label from "../../../../../components/Label";
import TextArea from "../../../../../components/TextArea";

const schema = yup.object({
  obdBorrowerId: yup.string(),
  supervisorComments: yup.string().required("Required.").max(500),
});

const BorrowerVisitSupervisorForm = ({
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
    control,
    // reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { supervisorComments } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
      });

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
      <input type="hidden" {...register("obdBorrowerId")} />

      <div className="form-col">
        <Label label="Group Name" value={defaultValues.groupName} />
        <Label label="Borrower’s Name" value={defaultValues.borrowerName} />
        <Label label="Overdue amount" value={defaultValues.overdueAmount} />
        <Label label="Loan amount" value={defaultValues.loanBalance} />
        <Label label="Amount collected" value={defaultValues.collectedAmount} />
        <Label label="Taken Action" value={defaultValues.takenAction} />
        <Label label="BM Comments" value={defaultValues.bmComments} />

        <TextArea
          control={control}
          name="supervisorComments"
          label="Follow up comments by the supervisor"
          areaHeight="h-14"
          errorMessage={supervisorComments?.message}
          isAutoFocus={true}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default BorrowerVisitSupervisorForm;
