import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import EmployeeForm from "./EmployeeForm";

const EmployeesEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("employeesdetails", `/employeesetup/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Employee Update"
        btn="Return"
        path="/hr/employee/list"
      />
      <EmployeeForm
        defaultValues={{
          employeeId: list.data.employeeId,
          employeePin: list.data.employeePin,
          employeeName: list.data.employeeName,
          contactNumber: list.data.contactNumber,
          email: list.data.email,
          branchId: list.data.branchId,
          departmentId: list.data.departmentId,
          designationId: list.data.designationId,
          staffTypeId: list.data.staffTypeId,
          gender: list.data.gender,
          dateOfBirth: new Date(list.data.dateOfBirth),
          joiningDate: new Date(list.data.joiningDate),
          grossSalaryUsd: list.data.grossSalaryUsd,
          grossSalary: list.data.grossSalary,
          nssfNumber: list.data.nssfNumber,
          bankId: list.data.bankId,
          bankAccountNumber: list.data.bankAccountNumber,
          tinNumber: list.data.tinNumber,
          saccoDeduction: list.data.saccoDeduction,
          motherName: list.data.motherName,
          fatherName: list.data.fatherName,
          religion: list.data.religion,
          maritalStatus: list.data.maritalStatus,
          bloodGroup: list.data.bloodGroup,
          educationId: list.data.educationId,
          languagesSpoken: list.data.languagesSpoken,
          imageUrl: list.data.imageUrl,
          contactAddress: list.data.contactAddress,
          fatherContactNumber: list.data.fatherContactNumber,
          motherContactNumber: list.data.motherContactNumber,
          kinName: list.data.kinName,
          kinAddress: list.data.kinAddress,
          kinContactNumber: list.data.kinContactNumber,
          kinRelationship: list.data.kinRelationship,
          kinEmail: list.data.kinEmail,

          entryBy: list.data.entryBy,
          entryDate: new Date(list.data.entryDate),
          updateBy: list.data.updateBy,
          updateDate: new Date(list.data.updateDate),
        }}
        action={refetch}
        btnText="Update"
        path="/employeesetup/update"
        returnPath="/hr/employee/list"
        isEdit={list.data.canEdit}
      />
    </div>
  );
};

export default EmployeesEdit;
