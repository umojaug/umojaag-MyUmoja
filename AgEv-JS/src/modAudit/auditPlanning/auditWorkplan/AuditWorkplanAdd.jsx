import React from "react";
import AuditWorkplanForm from "./AuditWorkplanForm";
import TopHeader from "../../../components/TopHeader";

const AuditWorkplanAdd = () => {
  const defaultValues = {
    workPlanId: "",
    monthName: "",
    branchId: "",
    auditor: "",
    fieldDays: "",
    expectedCost: "",
    auditStatus: "Pending",
    reportStatus: "Pending",
    discussionStatus: "Pending",
    followUpStatus: "Pending",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Audit Workplan Add"
        btn="Return"
        path="/audit/workplan/list"
      />
      <AuditWorkplanForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditWorkplan/create"
        returnPath="/audit/workplan/list"
      />
    </div>
  );
};

export default AuditWorkplanAdd;
