import React from "react";
import TopHeader from "../../../../components/TopHeader";
import VisitForm from "./VisitForm";

const VisitAdd = () => {
  const defaultValues = {
    allVisitId: "",
    visitDate: new Date(),
    visitEndDate: new Date(),
    entryTime: "",
    exitTime: "",
    branchId: "",
    visitType: "Regular Branch Visit",
    stayOvernight: "No",
    pinName: "",
    managerPin: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Visit Add" btn="Return" path="/ops/visit/list" />
      <VisitForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/allVisit/create"
        returnPath="/ops/visit/list"
      />
    </div>
  );
};

export default VisitAdd;
