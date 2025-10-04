import React from "react";
import TopHeader from "../../../components/TopHeader";
import SubGroupForm from "./SubGroupForm";

const SubGroupAdd = () => {
  const defaultValues = {
    subGroupId:"",
    groupId: "",
    subGroupName: "",
    
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add SubGroup"
        btn="Return"
        path="/ac/settings/subGroup/list"
      />
      <SubGroupForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/acSubGroup/create"
        returnPath="/ac/settings/subGroup/list"
      />
    </div>
  );
};

export default SubGroupAdd;
