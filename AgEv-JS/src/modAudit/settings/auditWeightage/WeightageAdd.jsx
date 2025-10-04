import React from "react";
import TopHeader from "../../../components/TopHeader";
import WeightageForm from "./WeightageForm";

const WeightageAdd = () => {
  const defaultValues = {
    weightageId: "",
    weightageName: "",
    weightageRangeFrom: "",
    weightageRangeTo: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Weightage"
        btn="Return"
        path="/audit/settings/weightage/list"
      />
      <WeightageForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditweightage/create"
        returnPath="/audit/settings/weightage/list"
      />
    </div>
  );
};

export default WeightageAdd;
