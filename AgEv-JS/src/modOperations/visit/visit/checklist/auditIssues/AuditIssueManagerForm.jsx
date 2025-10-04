import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { usePostData } from "../../../../../hooks/dataApi";
import Label from "../../../../../components/Label";
import SaveButton from "../../../../../components/button/SaveButton";
import TextArea from "../../../../../components/TextArea";

const schema = yup.object({
  seAuditIssueId: yup.string(),
  supervisorComments: yup.string().required("Required.").max(500),
});

const AuditIssueManagerForm = ({
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

      // if (status === 201) {
      //   toast.success("Saved successfully!");
      //   reset();
      // }
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
      <input type="hidden" {...register("seAuditIssueId")} />
      <Label label="Issues" value={defaultValues.issues} />
      <Label label="Settle or Not " value={defaultValues.isSettled} />
      <Label label="Pending Reason" value={defaultValues.pendingReason} />
      <Label label="Comments Of BM" value={defaultValues.bmComments} />
      <div className="form-col">
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

export default AuditIssueManagerForm;
