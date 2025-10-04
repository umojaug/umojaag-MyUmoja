import React from "react";
import TopHeader from "../../../components/TopHeader";
import PreviousYearBranchForm from "./PreviousYearBranchForm";

const PreviousYearBranchAdd = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Previous Year Branch Create"
        btn="Return"
        path="/audit/settings/previousdata/list"
      />
      <PreviousYearBranchForm
        path="/previousYear/create"
        returnPath="/audit/settings/previousdata/list"
      />
    </div>
  );
};

export default PreviousYearBranchAdd;
