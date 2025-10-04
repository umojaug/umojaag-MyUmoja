import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../../hooks/dataApi";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import SaveButton from "../../../components/button/SaveButton";
import { SelectFromOptions } from "../../../components/SelectList";

const schema = yup.object({
  companyId: yup.string().max(50),
  companyName: yup.string().required("Required.").max(50),
  companyAddress: yup.string().required("Required.").max(50),
  nssfEmployee: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  nssfEmployer: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  googleDriveKey: yup.string().required("Required.").max(50),
  country: yup.string().required("Required.").max(50),
  nidDigit: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  voterIdDigit: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  contactDigit: yup
    .number()
    .min(0, "Must be greater than or equal to 0")
    .typeError("Positive number required"),
  voterIdRequired: yup.string().required("Required.").max(50),
  myUmojaUrl: yup
    .string()
    .required("Required.")
    .url("Must be a valid URL.")
    .max(100, "Must be at most 100 characters."),

});

const CompanyForm = ({ defaultValues, action, btnText, path }) => {
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    companyName,
    companyAddress,
    nssfEmployee,
    nssfEmployer,
    googleDriveKey,
    country,
    nidDigit,
    voterIdDigit,
    contactDigit,
    voterIdRequired,
    myUmojaUrl,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
      });
      if (status === 204) {
        toast.success("Update successful!");
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
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
      <input type="hidden" {...register("companyId")} />
      <div className="form-col-2">
        <Input
          name="companyName"
          label="Company Name"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={companyName?.message}
        />
        <Input
          name="companyAddress"
          label="Company Address"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={companyAddress?.message}
        />
        <Input
          name="nssfEmployee"
          label="NSSF Employee %"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={nssfEmployee?.message}
        />
        <Input
          name="nssfEmployer"
          label="NSSF Employer %"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={nssfEmployer?.message}
        />
        <Input
          name="googleDriveKey"
          label="Google Drive Key"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={googleDriveKey?.message}
        />
        <SelectFromOptions
          register={register}
          options={["Uganda", "Kenya", "Zambia", "Tanzania"]}
          label="Country"
          name="country"
          errorMessage={country?.message}
        />
        <Input
          name="nidDigit"
          label="NID Digit"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={nidDigit?.message}
        />
        <Input
          name="voterIdDigit"
          label="Voter Id Digit"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={voterIdDigit?.message}
        />
        <Input
          name="contactDigit"
          label="Contact Digit"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={contactDigit?.message}
        />
        <SelectFromOptions
          register={register}
          options={["Yes", "No"]}
          label="Voter Id Required"
          name="voterIdRequired"
          errorMessage={voterIdRequired?.message}
        />
      </div>
      <div className="mb-4">
          <Input
          name="myUmojaUrl"
          label="My Umoja Url"
          type="text"
          register={register}
          isAutoFocus={true}
          errorMessage={myUmojaUrl?.message}
        />
      </div>
      <SaveButton btnText={btnText} disabled={submitting} />
    </form>
  );
};

export default CompanyForm;
