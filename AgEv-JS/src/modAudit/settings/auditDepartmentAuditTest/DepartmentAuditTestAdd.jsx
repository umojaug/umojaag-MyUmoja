import React from "react";
import TopHeader from "../../../components/TopHeader";
import DepartmentAuditTestForm from "./DepartmentAuditTestForm";

const DepartmentAuditTestAdd = () => {
  const defaultValues = {
    testId: "",
    testArea: "",
    testSteps: "",
    departmentId: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Department Audit Test"
        btn="Return"
        path="/audit/settings/departmentAuditTest/list"
      />
      <DepartmentAuditTestForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditDepartmentalInvestigation/create"
        returnPath="/audit/settings/departmentAuditTest/list"
      />
    </div>
  );
};

export default DepartmentAuditTestAdd;
