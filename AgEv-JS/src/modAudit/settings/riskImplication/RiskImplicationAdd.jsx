import React from "react";
import TopHeader from "../../../components/TopHeader";
import RiskImplicationForm from "./RiskImplicationForm";

const RiskImplicationAdd = () => {
  const defaultValues = {
    riskImplicationId: "",
    riskImplicationName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Risk Implication Create"
        btn="Return"
        path="/audit/settings/riskImplication/list"
      />
      <RiskImplicationForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/riskImplication/create"
        returnPath="/audit/settings/riskImplication/list"
      />
    </div>
  );
};

export default RiskImplicationAdd;
