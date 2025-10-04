import React from "react";
import TopHeader from "../../components/TopHeader";
import EmployeeForm from "./EmployeeForm";

const EmployeeAdd = () => {
  const defaultValues = {
    employeeId: "",
    employeeName: "",
    contactNumber: "",
    email: "",
    branchId: "",
    departmentId: "",
    designationId: "",
    staffTypeId: "10001",
    gender: "Prefer not to say",
    dateOfBirth: "",
    joiningDate: new Date(),
    grossSalaryUsd: "0",
    grossSalary: "",
    nssfNumber: "",
    bankId: "",
    bankAccountNumber: "",
    tinNumber: "",
    saccoDeduction: "",
    motherName: "",
    fatherName: "",
    religion: "Prefer not to say",
    maritalStatus: "Prefer not to say",
    bloodGroup: "Prefer not to say",
    educationId: "10050",
    languagesSpoken: "Luganda",
    imageUrl: "1vyhSgRVvN5Y7FaTX2HBLGse7i2BmkDN6",
    contactAddress: "",
    fatherContactNumber: "",
    motherContactNumber: "",
    kinName: "",
    kinAddress: "",
    kinContactNumber: "",
    kinRelationship: "",
    kinEmail: "",
    nrc: "0",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Employee Create"
        btn="Return"
        path="/hr/employee/list"
      />
      <EmployeeForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/employeesetup/create"
        returnPath="/hr/employee/list"
        isEdit={false}
      />
    </div>
  );
};

export default EmployeeAdd;
