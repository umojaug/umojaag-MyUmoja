import React from "react";
import InvestigationForm from "./InvestigationForm";
import TopHeader from "../../../components/TopHeader";

const InvestigationAdd = () => {
  const defaultValues = {
    investigationId: "",
    title: "",
    branchId: "",
    departmentId: "",
    investigationDate: new Date(),
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Special Investigation Create"
        btn="Return"
        path="/audit/excution/special/investigation/list"
      />
      <InvestigationForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditSpInvestigation/create"
        returnPath="/audit/excution/special/investigation/list"
      />
    </div>
  );
};

export default InvestigationAdd;
