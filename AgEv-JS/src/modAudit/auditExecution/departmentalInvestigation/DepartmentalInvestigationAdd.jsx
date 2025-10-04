import React from "react";
import TopHeader from "../../../components/TopHeader";
import DepartmentalInvestigationForm from "./DepartmentalInvestigationForm";

const DepartmentalInvestigationAdd = () => {
  const defaultValues = {
    functionalityInvestigationId: "",
    title: "",
    // branchId: "",
    departmentId: "",
    investigationDate: new Date(),
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Departmental Audit Create"
        btn="Return"
        path="/audit/excution/departmental/list"
      />
      <DepartmentalInvestigationForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/AuditDpInvestigation/create"
        returnPath="/audit/excution/departmental/list"
      />
    </div>
  );
};

export default DepartmentalInvestigationAdd;
