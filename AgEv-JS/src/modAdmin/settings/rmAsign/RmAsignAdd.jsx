import React from "react";
import TopHeader from "../../../components/TopHeader";
import RmAsignForm from "./RmAsignForm";

const RmAsignAdd = () => {
  const defaultValues = {
    RegionId: "",
    employeeId: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Asign Regional Manager"
        btn="Return"
        path="/admin/settings/rm/asign/list"
      />
      <RmAsignForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/RmAssign/create"
        returnPath="/admin/settings/rmAsign/list"
      />
    </div>
  );
};

export default RmAsignAdd;
