import React from "react";
import TopHeader from "../../../components/TopHeader";
import BmAsignForm from "./BmAsignForm";

const BmAsignAdd = () => {
  const defaultValues = {
    employeeId: "",
    branchId: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Branch Manager Asign"
        btn="Return"
        path="/admin/settings/bm/asign/list"
      />
      <BmAsignForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/BmAssign/create"
        returnPath="/admin/settings/bm/asign/list"
      />
    </div>
  );
};

export default BmAsignAdd;
