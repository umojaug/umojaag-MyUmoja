import React from "react";

import TopHeader from "../../components/TopHeader";
import FmpuForm from "./FmpuForm";

const FmpuAdd = () => {
  const defaultValues = {
    reportId: "",
    branchId: "",
    detectionMethod: "",
    typeOfFraud: "",
    whoMightBeInvolved: "",
    positionOfFraudster: "",
    fraudBeingPerpetrated: "",
    numberOfOccurences: "",
    potentialWitness: "",
    documentReview: "",
    observations: "",
    estimatedFraudLoss: "",
    recommendations: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="FMPU Create" btn="Return" path="/ops/fmpu/list" />
      <FmpuForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/fmpu/create"
        returnPath="/ops/fmpu/list"
      />
    </div>
  );
};

export default FmpuAdd;
