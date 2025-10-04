import React from "react";
import TopHeader from "../../../../components/TopHeader";
import VisitForm from "./VisitForm";

const VisitAdd = () => {
  const defaultValues = {
    rmVisitId: "",
    visitDate: new Date(),
    branchId: "",
    visitType: "Regular Branch Visit",
    stayOvernight: "No",
    managerId: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="RM Branch Visit Create"
        btn="Return"
        path="/ops/rm/visit/list"
      />
      <VisitForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/rmvisit/create"
        returnPath="/ops/rm/visit/list"
      />
    </div>
  );
};

export default VisitAdd;
