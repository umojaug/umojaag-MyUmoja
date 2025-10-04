/* eslint-disable react/prop-types */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import DatePicker from "../../../components/DatePicker";
import moment from "moment";
import Input from "../../../components/Input";
import SaveButton from "../../../components/button/SaveButton";
import { usePostData } from "../../../hooks/dataApi";

const schema = yup.object({
  // slNo: yup.string().required("Required"),
  // name: yup.string().max(50).required("Required"),
  // relationship: yup.string().max(50).required("Required"),
  // receivedBenefitPercentage: yup.number().required("Required"),
  // dob: yup.date().required("Required"),
  // idNumber: yup.string().max(50).required("Required"),
  // beneficiaryContactNumber: yup.string().max(50).required("Required"),
  // beneficiaryEmail: yup.string().max(50).required("Required"),
  // beneficiaryAddress: yup.string().max(50).required("Required"),
});

const BeneficiaryDependentFrom = ({
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
    childFullName,
    dateOfBirth,
    idNumber,
    childAddress,
    guardianFullName,
    guardianContact,
    guardianAddress,
    guardianDesignation,
    guardianEmail,
  } = errors;

  const onSubmit = async (formData) => {
    console.log(formData);
    var data = new FormData();
    data.append("childDependentId", formData.childDependentId);
    //data.append("beneficiaryId", formData.beneficiaryId);
    data.append("childFullName", formData.childFullName);
    data.append(
      "dateOfBirth",
      moment.utc(formData.dateOfBirth).local().format("YYYY-MM-DD")
    );
    data.append("idNumber", formData.idNumber);
    data.append("childAddress", formData.childAddress);
    data.append("guardianFullName", formData.guardianFullName);
    data.append("guardianContact", formData.guardianContact);
    data.append("guardianAddress", formData.guardianAddress);
    data.append("guardianDesignation", formData.guardianDesignation);
    data.append("guardianEmail", formData.guardianEmail);

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
      <div className="w-full pr-4 border-r border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {titleText}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-col-2">
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <DatePicker
                label="Date of Birth"
                field={field}
                errorMessage={dateOfBirth?.message}
                isRow={false}
              />
            )}
          />

          <Input
            name="childFullName"
            label="Child Full Name"
            type="text"
            register={register}
            errorMessage={childFullName?.message}
          />

          <Input
            name="idNumber"
            label="ID Number"
            type="text"
            register={register}
            errorMessage={idNumber?.message}
          />

          <Input
            name="childAddress"
            label="Child Address"
            type="text"
            register={register}
            errorMessage={childAddress?.message}
          />

          <Input
            name="guardianFullName"
            label="Guardian Full Name"
            type="text"
            register={register}
            errorMessage={guardianFullName?.message}
          />

          <Input
            name="guardianContact"
            label="Guardian Contact"
            type="text"
            register={register}
            errorMessage={guardianContact?.message}
          />

          <Input
            name="guardianAddress"
            label="Guardian Address"
            type="text"
            register={register}
            errorMessage={guardianAddress?.message}
          />

          <Input
            name="guardianDesignation"
            label="Guardian Designation"
            type="text"
            register={register}
            errorMessage={guardianDesignation?.message}
          />

          <Input
            name="guardianEmail"
            label="Guardian Email"
            type="email"
            register={register}
            errorMessage={guardianEmail?.message}
          />
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <SaveButton btnText={btnText} disabled={submitting} />
        </div>
      </form>
    </div>
  );
};

export default BeneficiaryDependentFrom;
