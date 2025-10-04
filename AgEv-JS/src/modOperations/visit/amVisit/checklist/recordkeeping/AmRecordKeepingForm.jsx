import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../../../components/Input";
import SaveButton from "../../../../../components/button/SaveButton";

const schema = yup.object({
  opsAmRecordKeepingId: yup.number(),
  amVisitId: yup.string().required("Required.").max(50),
  booksAccount: yup.string().required("Required.").max(50),
  matchedWith: yup.string().required("Required.").max(50),
  finding: yup.string().required("Required.").max(50),
  suggestion: yup.string().required("Required.").max(50),
  remarks: yup.string().required("Required.").max(250),
});

const AmRecordKeepingForm = ({
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
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { booksAccount, matchedWith, finding, suggestion, remarks } = errors;

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
      <input type="hidden" {...register("opsAmGroupvisitId")} />
      <input type="hidden" {...register("amVisitId")} />
      <div className="form-col">
        <Input
          name="booksAccount"
          label="Books of Account"
          type="text"
          register={register}
          errorMessage={booksAccount?.message}
          isReadOnly={true}
        />
        <Input
          name="matchedWith"
          label="Matched With"
          type="text"
          register={register}
          errorMessage={matchedWith?.message}
          isReadOnly={true}
        />
        <Input
          name="finding"
          label="Finding/Irregularities"
          type="text"
          register={register}
          errorMessage={finding?.message}
          isAutoFocus={true}
        />
        <Input
          name="suggestion"
          label="Suggesion/Recommendation"
          type="text"
          register={register}
          errorMessage={suggestion?.message}
        />
        <Input
          name="remarks"
          label="Remarks"
          register={register}
          errorMessage={remarks?.message}
        />

        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default AmRecordKeepingForm;
