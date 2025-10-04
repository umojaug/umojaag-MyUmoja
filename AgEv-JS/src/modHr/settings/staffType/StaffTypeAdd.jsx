import React from "react";
import TopHeader from "../../../components/TopHeader";
import StaffTypeForm from "./StaffTypeForm";

const StaffTypeAdd = () => {
  const defaultValues = {
    StaffTypeId: "",
    staffTypeName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Staff Type"
        btn="Return"
        path="/hr/settings/staff-type/list"
      />
      <StaffTypeForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/staffTypes/create"
        returnPath="/hr/settings/staff-type/list"
      />
    </div>
  );
};

export default StaffTypeAdd;
