/* eslint-disable react/prop-types */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostData } from "../../../hooks/dataApi";
import Input from "../../../components/Input";
import DatePicker from "../../../components/DatePicker";
import moment from "moment";
import SaveButton from "../../../components/button/SaveButton";
import { SelectFromOptions } from "../../../components/SelectList";

const schema = yup.object({
  slNo: yup.string().required("Required"),
  name: yup.string().max(50).required("Required"),
  relationship: yup.string().max(50).required("Required"),
  receivedBenefitPercentage: yup.number().required("Required"),
  dob: yup.date().required("Required"),
  idNumber: yup.string().max(50).required("Required"),
  beneficiaryContactNumber: yup.string().max(50).required("Required"),
  beneficiaryEmail: yup.string().max(50).required("Required"),
  beneficiaryAddress: yup.string().max(50).required("Required"),
});

const BeneficiaryPrimaryFrom = ({
  defaultValues,
  closeModal,
  path,
  titleText,
  btnText,
}) => {
  const { mutateAsync } = usePostData();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    // beneficiaryId,
    slNo,
    name,
    relationship,
    receivedBenefitPercentage,
    dob,
    idNumber,
    beneficiaryContactNumber,
    beneficiaryEmail,
    beneficiaryAddress,
  } = errors;

  const onSubmit = async (formData) => {
    console.log(formData);
    var data = new FormData();
    data.append("beneficiaryId", formData.beneficiaryId);
    data.append("slNo", formData.slNo);
    data.append("name", formData.name);
    data.append("relationship", formData.relationship);
    data.append(
      "receivedBenefitPercentage",
      formData.receivedBenefitPercentage
    );
    data.append("dob", moment.utc(formData.dob).local().format("YYYY-MM-DD"));
    data.append("idNumber", formData.idNumber);
    data.append("beneficiaryContactNumber", formData.beneficiaryContactNumber);
    data.append("beneficiaryEmail", formData.beneficiaryEmail);
    data.append("beneficiaryAddress", formData.beneficiaryAddress);

    // data.append("educationId", formData.educationId);

    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
        // addCreateNew === false && closeModal();
      }
      if (status === 204) {
        toast.success("Update successful!");
        closeModal();
        // navigate(returnPath);
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
    <div className=" bg-white rounded-md p-6">
      <input type="hidden" {...register("beneficiaryId")} />
      <div className="w-1/3 pr-4 border-r border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {titleText}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-col-2">
          <SelectFromOptions
            register={register}
            options={[
              "1st",
              "2nd",
              "3rd",
              "4th",
              "5th",
              "6th",
              "7th",
              "8th",
              "9th",
              "10th",
              "11th",
              "12th",
              "13th",
              "14th",
              "15th",
              "16th",
              "17th",
              "18th",
              "19th",
              "20th",
            ]}
            label="Serial Number"
            name="slNo"
            errorMessage={slNo?.message}
          />

          <Input
            name="name"
            label="Name"
            type="text"
            register={register}
            errorMessage={name?.message}
          />

          <SelectFromOptions
            register={register}
            options={[
              "Father",
              "Mother",
              "Son",
              "Daughter",
              "Brother",
              "Sister",
              "Husband",
              "Wife",
              "Grandfather",
              "Grandmother",
              "Grandson",
              "Granddaughter",
              "Uncle",
              "Aunt",
              "Nephew",
              "Niece",
              "Cousin",
              "Father-in-law",
              "Mother-in-law",
              "Brother-in-law",
              "Sister-in-law",
              "Son-in-law",
              "Daughter-in-law",
              "Stepfather",
              "Stepmother",
              "Stepson",
              "Stepdaughter",
              "Guardian",
              "Relative",
            ]}
            label="Relationship"
            name="relationship"
            errorMessage={relationship?.message}
          />

          <Input
            name="receivedBenefitPercentage"
            label="Percentage of Total Benefit Monetary Amount to be received"
            type="text"
            register={register}
            errorMessage={receivedBenefitPercentage?.message}
          />

          <Controller
            control={control}
            name="dob"
            render={({ field }) => (
              <DatePicker
                label="Date of birth"
                field={field}
                errorMessage={dob?.message}
                isRow={false}
              />
            )}
          />
          <Input
            name="idNumber"
            label="Id Number"
            type="text"
            register={register}
            errorMessage={idNumber?.message}
          />

          <Input
            name="beneficiaryContactNumber"
            label="Beneficiary Contact Number"
            type="text"
            register={register}
            errorMessage={beneficiaryContactNumber?.message}
          />

          <Input
            name="beneficiaryEmail"
            label="Beneficiary Email"
            type="text"
            register={register}
            errorMessage={beneficiaryEmail?.message}
          />

          <Input
            name="beneficiaryAddress"
            label="Beneficiary Address"
            type="text"
            register={register}
            errorMessage={beneficiaryAddress?.message}
          />
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <SaveButton btnText={btnText} disabled={submitting} />
        </div>
      </form>

      {/* <BeneficiaryList /> */}
    </div>
  );
};

export default BeneficiaryPrimaryFrom;
