import React from "react";
import TopHeader from "../../../components/TopHeader";
import BranchForm from "./BranchForm";

const BranchAdd = () => {
  const defaultValues = {
    branchId: "",
    areaId: "",
    branchName: "",
    startDate:""
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Branch"
        btn="Return"
        path="/admin/settings/branch/list"
      />
      <BranchForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/branches/create"
        returnPath="/admin/settings/branch/list"
      />
    </div>
  );
};

export default BranchAdd;
