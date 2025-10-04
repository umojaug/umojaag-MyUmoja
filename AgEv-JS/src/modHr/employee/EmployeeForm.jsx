import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostData } from "../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import InputFile from "../../components/InputFile";
import SaveButton from "../../components/button/SaveButton";
import moment from "moment";
import DatePicker from "../../components/DatePicker";
import { SelectFromDb, SelectFromOptions } from "../../components/SelectList";
import { selectOptions } from "../../data/selectOptions";
import Label from "../../components/Label";
import { format } from "date-fns";

const schema = yup
  .object({
    employeeId: yup.string().max(50),
    employeeName: yup.string().required("Required").max(50),
    contactNumber: yup.string().required("Required").max(50),
    email: yup.string().email("Provide a valid email").max(50),
    branchId: yup.string().required("Required").max(50),
    departmentId: yup.string().required("Required").max(50),
    designationId: yup.string().required("Required").max(50),
    staffTypeId: yup.string().required("Required").max(50),
    gender: yup.string().required("Required").max(50),
    dateOfBirth: yup.date().required("Required"),
    joiningDate: yup.date().required("Required"),
    grossSalaryUsd: yup
      .number()
      .min(0, "Must be greater than or equal to 0")
      .typeError("Positive number required"),
    grossSalary: yup
      .number()
      .min(0, "Must be greater than or equal to 0")
      .typeError("Positive number required"),
    nssfNumber: yup
      .string()
      .required("Required")
      .max(50)
      .min(10, "Must be at least 10 characters"),
    bankId: yup.string().required("Required").max(50),
    bankAccountNumber: yup.string().required("Required").max(50),
    tinNumber: yup
      .string()
      .required("Required")
      .max(50)
      .min(10, "Must be at least 10 characters"),
    saccoDeduction: yup
      .number()
      .min(0, "Must be greater than or equal to 0")
      .typeError("Positive number required"),
    motherName: yup.string().required("Required").max(50),
    fatherName: yup.string().required("Required").max(50),
    religion: yup.string().max(50),
    maritalStatus: yup.string().max(50),
    bloodGroup: yup.string().max(50),
    educationId: yup.string().required("Required").max(50),
    languagesSpoken: yup.string().required("Required").max(50),
    contactAddress: yup.string().required("Required").max(50),
    fatherContactNumber: yup.string().max(50),
    motherContactNumber: yup.string().max(50),
    kinName: yup.string().max(50),
    kinAddress: yup.string().max(50),
    kinContactNumber: yup.string().max(50),
    kinRelationship: yup.string().max(50),
    kinEmail: yup.string().email("Provide a valid email").max(50),
  })
  .shape({
    //   picture: yup.mixed(),
    // .test("required", "You need to provide a file", (value) => {
    //   return value && value.length;
    // })
    // .test("fileSize", "The file is too large", (value, context) => {
    //   return value && value[0] && value[0].size <= 200000;
    // })
    // .test("type", "We only support jpeg", function (value) {
    //   return value && value[0] && value[0].type === "image/jpeg";
    // }),
  });

const EmployeeForm = ({
  defaultValues,
  action,
  btnText,
  path,
  returnPath,
  isEdit,
}) => {
  const navigate = useNavigate();
  const { mutateAsync, reset } = usePostData();
  const [submitting, setSubmitting] = useState(false);
  const [file, setPhoto] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    employeeName,
    contactNumber,
    email,
    branchId,
    departmentId,
    designationId,
    staffTypeId,
    gender,
    dateOfBirth,
    joiningDate,
    grossSalaryUsd,
    grossSalary,
    nssfNumber,
    bankId,
    bankAccountNumber,
    tinNumber,
    nidNumber,
    saccoDeduction,
    motherName,
    fatherName,
    religion,
    maritalStatus,
    bloodGroup,
    educationId,
    languagesSpoken,
    contactAddress,
    picture,
    fatherContactNumber,
    motherContactNumber,
    kinName,
    kinAddress,
    kinContactNumber,
    kinRelationship,
    kinEmail,
  } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    var data = new FormData();
    data.append("employeeId", formData.employeeId);
    data.append("employeeName", formData.employeeName);
    data.append("contactNumber", formData.contactNumber);
    data.append("email", formData.email);
    data.append("branchId", formData.branchId);
    data.append("departmentId", formData.departmentId);
    data.append("designationId", formData.designationId);
    data.append("staffTypeId", formData.staffTypeId);
    data.append("gender", formData.gender);
    data.append(
      "dateOfBirth",
      moment.utc(formData.dateOfBirth).local().format("YYYY-MM-DD")
    );
    data.append(
      "joiningDate",
      moment.utc(formData.joiningDate).local().format("YYYY-MM-DD")
    );
    data.append("grossSalaryUsd", formData.grossSalaryUsd);
    data.append("grossSalary", formData.grossSalary);
    data.append("nssfNumber", formData.nssfNumber);
    data.append("bankId", formData.bankId);
    data.append("bankAccountNumber", formData.bankAccountNumber);
    data.append("tinNumber", formData.tinNumber);
    data.append("nidNumber", formData.nidNumber);
    data.append("saccoDeduction", formData.saccoDeduction);
    data.append("motherName", formData.motherName);
    data.append("fatherName", formData.fatherName);
    data.append("religion", formData.religion);
    data.append("maritalStatus", formData.maritalStatus);
    data.append("bloodGroup", formData.bloodGroup);
    data.append("educationId", formData.educationId);
    data.append("languagesSpoken", formData.languagesSpoken);
    data.append("contactAddress", formData.contactAddress);

    data.append("fatherContactNumber", formData.fatherContactNumber);
    data.append("motherContactNumber", formData.motherContactNumber);
    data.append("kinName", formData.kinName);
    data.append("kinAddress", formData.kinAddress);
    data.append("kinContactNumber", formData.kinContactNumber);
    data.append("kinEmail", formData.kinEmail);
    data.append("kinRelationship", formData.kinRelationship);
    data.append("ncr", "0");
    data.append(
      "file",
      // typeof imageUrl === "undefined" || imageUrl === null || imageUrl === ""
      //   ? fileName
      //   :
      file
    );
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: data,
      });
      if (status === 201) {
        toast.success("Saved successfully!");
        reset();
      }
      if (status === 204) {
        reset();
        toast.success("Update successful!");
        setTimeout(() => navigate(returnPath), 300);
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
      <input type="hidden" {...register("employeeId")} />
      <div className="grid gap-4">
        {/* <div className="section-title">Documents</div> */}
        <div className="form-col-3">
          <div>
            <img
              src={`https://drive.google.com/thumbnail?id=${defaultValues.imageUrl}`}
              alt=""
            />
            <InputFile
              name="picture"
              label="Upload Image"
              accept="image/*"
              register={register}
              action={setPhoto}
              errorMessage={picture?.message}
            />
          </div>
        </div>
        <div className="form-col-4">
          {isEdit === true && (
            <>
              <Label value={defaultValues.entryBy} label="Entry By" />
              <Label
                value={format(new Date(defaultValues.entryDate), "dd/MMM/yyyy")}
                label="Entry Date"
              />
              <Label value={defaultValues.updateBy} label="Updated By" />
              <Label
                value={format(
                  new Date(defaultValues.updateDate),
                  "dd/MMM/yyyy"
                )}
                label="Update Date"
              />
            </>
          )}
        </div>
        <div className="section-title">Basic information</div>
        <div className="form-col-4">
          {isEdit === true ? (
            <>
              <Label value={defaultValues.employeePin} label="PIN" />
              <Label value={defaultValues.employeeName} label="Name" />
            </>
          ) : (
            <Input
              name="employeeName"
              label="Employee Name"
              type="text"
              register={register}
              errorMessage={employeeName?.message}
            />
          )}
          <SelectFromDb
            control={control}
            label="Branch"
            path="/branches/select"
            name="branchId"
            errorMessage={branchId?.message}
            isDisabled={isEdit}
          />
          <SelectFromDb
            control={control}
            label="Department"
            path="/departments/select"
            name="departmentId"
            errorMessage={departmentId?.message}
            isDisabled={isEdit}
          />
          <SelectFromDb
            control={control}
            label="Designation"
            path="/designations/select"
            name="designationId"
            errorMessage={designationId?.message}
            isDisabled={isEdit}
          />
          <SelectFromDb
            control={control}
            label="Staff Type"
            path="/stafftypes/select"
            name="staffTypeId"
            errorMessage={staffTypeId?.message}
            isDisabled={isEdit}
          />
          {/* {isEdit === true ? (
            <Label
              value={moment
                .utc(defaultValues.joiningDate)
                .local()
                .format("DD-MMM-YYYY")}
              label="Joining Date"
            />
          ) : ( */}
          <Controller
            control={control}
            name="joiningDate"
            render={({ field }) => (
              <DatePicker
                label="Joining Date"
                field={field}
                errorMessage={joiningDate?.message}
                isRow={false}
              />
            )}
          />
          {/* )} */}
          <Input
            name="contactNumber"
            label="Contact Number"
            type="text"
            register={register}
            errorMessage={contactNumber?.message}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            register={register}
            errorMessage={email?.message}
          />
        </div>
        <div className="section-title">Salary information</div>
        <div className="form-col-4">
          {isEdit === false && (
            <>
              <Input
                name="grossSalaryUsd"
                label="Gross Salary(USD)"
                type="text"
                register={register}
                errorMessage={grossSalaryUsd?.message}
              />
              <Input
                name="grossSalary"
                label="Gross Salary"
                type="text"
                register={register}
                errorMessage={grossSalary?.message}
              />
            </>
          )}
          <Input
            name="nssfNumber"
            label="NSSF Number"
            type="text"
            register={register}
            errorMessage={nssfNumber?.message}
          />
          <SelectFromDb
            control={control}
            label="Bank"
            path="/banks/select"
            name="bankId"
            errorMessage={bankId?.message}
          />
          <Input
            name="bankAccountNumber"
            label="Bank Account Number"
            type="text"
            register={register}
            errorMessage={bankAccountNumber?.message}
          />
          <Input
            name="tinNumber"
            label="TIN Number"
            type="text"
            register={register}
            errorMessage={tinNumber?.message}
          />
          <Input
            name="nidNumber"
            label="NID Number"
            type="text"
            register={register}
            errorMessage={nidNumber?.message}
          />
          <Input
            name="saccoDeduction"
            label="Sacco Deduction"
            type="text"
            register={register}
            errorMessage={saccoDeduction?.message}
          />
        </div>
        <div className="section-title">Personal information</div>
        <div className="form-col-4">
          <SelectFromOptions
            register={register}
            options={selectOptions.gender}
            label="Gender"
            name="gender"
            errorMessage={gender?.message}
          />
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <DatePicker
                label="Date Of Birth"
                field={field}
                errorMessage={dateOfBirth?.message}
                isRow={false}
              />
            )}
          />
          <Input
            name="motherName"
            label="Mother Name"
            type="text"
            register={register}
            errorMessage={motherName?.message}
          />
          <Input
            name="motherContactNumber"
            label="Mother Contact"
            type="text"
            register={register}
            errorMessage={motherContactNumber?.message}
          />
          <Input
            name="fatherName"
            label="Father Name"
            type="text"
            register={register}
            errorMessage={fatherName?.message}
          />
          <Input
            name="fatherContactNumber"
            label="Father Contact"
            type="text"
            register={register}
            errorMessage={fatherContactNumber?.message}
          />
          <Input
            name="kinName"
            label="Next of Kin's Name"
            type="text"
            register={register}
            errorMessage={kinName?.message}
          />
          <Input
            name="kinAddress"
            label="Next of Kin's Address"
            type="text"
            register={register}
            errorMessage={kinAddress?.message}
          />
          <Input
            name="kinContactNumber"
            label="Next of Kin's Contact"
            type="text"
            register={register}
            errorMessage={kinContactNumber?.message}
          />
          <Input
            name="kinEmail"
            label="Kin Email Address:"
            type="email"
            register={register}
            errorMessage={kinEmail?.message}
          />
          <Input
            name="kinRelationship"
            label="Next of Kin's Relationship"
            type="text"
            register={register}
            errorMessage={kinRelationship?.message}
          />
          <SelectFromOptions
            register={register}
            options={selectOptions.religion}
            label="Religion List"
            name="religion"
            errorMessage={religion?.message}
          />
          <SelectFromOptions
            register={register}
            options={selectOptions.maritalStatus}
            label="Marital status List"
            name="maritalStatus"
            errorMessage={maritalStatus?.message}
          />
          <SelectFromOptions
            register={register}
            options={selectOptions.bloodGroup}
            label="Blood Group List"
            name="bloodGroup"
            errorMessage={bloodGroup?.message}
          />
          <SelectFromDb
            control={control}
            label="Education"
            path="/educations/select"
            name="educationId"
            errorMessage={educationId?.message}
          />
          <SelectFromOptions
            register={register}
            options={selectOptions.localLanguage}
            label="Languages Spoken"
            name="languagesSpoken"
            errorMessage={languagesSpoken?.message}
          />
          <Input
            name="contactAddress"
            label="Contact Address"
            type="text"
            register={register}
            errorMessage={contactAddress?.message}
          />
        </div>
      </div>
      <div className="from-cols mt-4">
        <SaveButton btnText={btnText} disabled={submitting} />
      </div>
    </form>
  );
};

export default EmployeeForm;
