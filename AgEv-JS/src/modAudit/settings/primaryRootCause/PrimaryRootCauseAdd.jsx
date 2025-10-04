import React from "react";
import TopHeader from "../../../components/TopHeader";
import PrimaryRootCauseForm from "./PrimaryRootCauseForm";

const PrimaryRootCauseAdd = () => {
  const defaultValues = {
    primaryRootCauseId: "",
    primaryRootCauseName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Primary Root Cause Create"
        btn="Return"
        path="/audit/settings/primaryRootCause/list"
      />
      <PrimaryRootCauseForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/primaryRootCause/create"
        returnPath="/audit/settings/primaryRootCause/list"
      />
    </div>
  );
};

export default PrimaryRootCauseAdd;
