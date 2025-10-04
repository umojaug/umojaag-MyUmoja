import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import DepartmentAuditTestForm from "./DepartmentAuditTestForm";

const DepartmentAuditTestEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditDepartmentAuditTest", `/auditDepartmentalInvestigation/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Functionality Audit Test"
        btn="Return"
        path="/audit/settings/departmentAuditTest/list"
      />
      <DepartmentAuditTestForm
        defaultValues={{
          testId: list.data.testId,
          testArea: list.data.testArea,
          testSteps: list.data.testSteps,
          //auditTestDepartment: list.data.auditTestDepartment,
          departmentId: list.data.departmentId,
        }}
        action={refetch}
        btnText="Update"
        path="/auditDepartmentalInvestigation/update"
        returnPath="/audit/settings/departmentAuditTest/list"
      />
    </div>
  );
};

export default DepartmentAuditTestEdit;
