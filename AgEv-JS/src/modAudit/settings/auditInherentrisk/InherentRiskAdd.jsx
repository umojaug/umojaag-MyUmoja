import React from "react";
import TopHeader from "../../../components/TopHeader";
import InherentRiskForm from "./InherentRiskForm";

const InherentRiskAdd = () => {
  const defaultValues = {
    inherentRiskId: "",
    inherentRiskName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Inherent Risk"
        btn="Return"
        path="/audit/settings/inherentrisk/list"
      />
      <InherentRiskForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditinherentrisk/create"
        returnPath="/audit/settings/inherentrisk/list"
      />
    </div>
  );
};

export default InherentRiskAdd;
