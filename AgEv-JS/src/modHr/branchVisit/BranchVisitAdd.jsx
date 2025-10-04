import React from "react";
import BranchVisitForm from "./BranchVisitForm";
import TopHeader from "../../components/TopHeader";

const BranchVisitAdd = () => {
  const defaultValues = {
    branchVisitId: "",
    branchId: "",
    visitDate: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Branch Visit Add"
        btn="Return"
        path="/hr/branch/visit/list"
      />
      <BranchVisitForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/branchVisit/create"
        returnPath="/hr/branch/visit/list"
      />
    </div>
  );
};

export default BranchVisitAdd;
