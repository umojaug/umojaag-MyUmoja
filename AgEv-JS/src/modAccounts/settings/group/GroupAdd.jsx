import React from "react";
import TopHeader from "../../../components/TopHeader";
import GroupForm from "./GroupForm";

const GroupAdd = () => {
  const defaultValues = {
    groupId: "",
    mainId: "",
    groupName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Group"
        btn="Return"
        path="/ac/settings/group/list"
      />
      <GroupForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/acgroup/create"
        returnPath="/ac/settings/group/list"
      />
    </div>
  );
};

export default GroupAdd;
