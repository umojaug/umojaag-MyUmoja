import React from "react";
import TopHeader from "../../../components/TopHeader";
import SpecialInvestigationForm from "./SpecialInvestigationForm";

const SpecialInvestigationAdd = () => {
  const defaultValues = {
    specialInvestigationId: "",
    guideline: "",
    testSteps: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Special Investigation"
        btn="Return"
        path="/audit/settings/specialInvestigation/list"
      />
      <SpecialInvestigationForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditSpecialInvestigation/create"
        returnPath="/audit/settings/specialInvestigation/list"
      />
    </div>
  );
};

export default SpecialInvestigationAdd;
