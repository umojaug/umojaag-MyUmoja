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
  opsAmGroupvisitId: yup.number(),
  amVisitId: yup.string().required("Required.").max(50),
  loName: yup.string().required("Required.").max(50),
  groupName: yup.string().required("Required.").max(50),
  totalBorrower: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  numberOfBorrower: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  passbookChecked: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  passbookMissing: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
});

const GroupVisitForm = ({
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
  const {
    loName,
    groupName,
    totalBorrower,
    numberOfBorrower,
    passbookChecked,
    passbookMissing,
  } = errors;

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
          name="loName"
          label="LO Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={loName?.message}
        />
        <Input
          name="groupName"
          label="Group name"
          type="text"
          register={register}
          errorMessage={groupName?.message}
        />
        <Input
          name="totalBorrower"
          label="Total borrower"
          type="text"
          register={register}
          errorMessage={totalBorrower?.message}
        />
        <Input
          name="numberOfBorrower"
          label="Number of borrower present"
          type="text"
          register={register}
          errorMessage={numberOfBorrower?.message}
        />
        <Input
          name="passbookChecked"
          label="Number of passbook checked with LO based"
          type="text"
          register={register}
          errorMessage={passbookChecked?.message}
        />
        <Input
          name="passbookMissing"
          label="Number of passbook missing"
          type="text"
          register={register}
          errorMessage={passbookMissing?.message}
        />
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default GroupVisitForm;
