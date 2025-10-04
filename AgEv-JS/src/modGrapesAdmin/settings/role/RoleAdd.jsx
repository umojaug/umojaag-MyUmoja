import React from "react";
import TopHeader from "../../../components/TopHeader";

import RoleForm from "./RoleForm";

const RoleAdd = () => {
  const defaultValues = {
    id: "",
    roleName: "",
   
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title={("Add New Role")}
        btn="Return"
       // path="/subscriber/settings/song"
        path="/grapes/settings/role"
      />
      <RoleForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText={("Save")}
        path="/role/create"
        //returnPath="/subscriber/settings/song"
        returnPath="/grapes/settings/role"
      />
    </div>
  );
};

export default RoleAdd;

