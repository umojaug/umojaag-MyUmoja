import React from "react";
import TopHeader from "../../../../components/TopHeader";
import VisitForm from "./VisitForm";

const VisitAdd = () => {
  const defaultValues = {
    amVisitId: "",
    visitDate: new Date(),
    branchId: "",
    visitType: "Regular Branch Visit",
    stayOvernight: "No",
    managerId: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="AM Branch Visit Create"
        btn="Return"
        path="/ops/am/visit/list"
      />
      <VisitForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/amvisit/create"
        returnPath="/ops/am/visit/list"
      />
    </div>
  );
};

export default VisitAdd;
