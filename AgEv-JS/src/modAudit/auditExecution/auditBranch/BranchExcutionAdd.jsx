import React from "react";
import CreationForm from "./BranchExcutionForm";
import TopHeader from "../../../components/TopHeader";

const BranchExcutionAdd = () => {
  const defaultValues = {
    auditId: "",
    auditName: "",
    branchId: "",
    bmId: "",
    amId: "",
    rmId: "",
    auditEndDate: "",
    auditStartDate: "",
    periodUnderAudit: "",
    lastAuditPeriod: "",
    auditNotification: "",
    auditObjectives: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Create Audit" btn="Return" path="/audit/list" />
      <CreationForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditExcutionUnit/create"
        returnPath="/audit/excution/branch/list"
      />
    </div>
  );
};

export default BranchExcutionAdd;
