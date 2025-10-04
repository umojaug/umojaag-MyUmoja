import React from "react";
import TopHeader from "../../../components/TopHeader";
import AuditTestStepsForm from "./AuditTestStepsForm";

const AuditTestStepsAdd = () => {
  const defaultValues = {
    auditTestStepsId: "",
    auditAreaId: "",
    testStepsName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Audit Test"
        btn="Return"
        path="/audit/settings/testSteps/list"
      />
      <AuditTestStepsForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditTestSteps/create"
        returnPath="/audit/settings/testSteps/list"
      />
    </div>
  );
};

export default AuditTestStepsAdd;
