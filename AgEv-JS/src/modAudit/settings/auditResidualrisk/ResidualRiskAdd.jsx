import React from "react";
import TopHeader from "../../../components/TopHeader";
import ResidualRiskForm from "./ResidualRiskForm";

const ResidualRiskAdd = () => {
  const defaultValues = {
    residualRiskId: "",
    residualRiskName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Residualr Risk"
        btn="Return"
        path="/audit/settings/residualrisk/list"
      />
      <ResidualRiskForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditresidualrisk/create"
        returnPath="/audit/settings/residualrisk/list"
      />
    </div>
  );
};

export default ResidualRiskAdd;
