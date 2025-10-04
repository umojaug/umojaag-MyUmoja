import React from "react";
import TopHeader from "../../../../components/TopHeader";
import MenuAssignRoleForm from "./MenuAssignRoleForm";

const MenuAssignRoleAdd = () => {
  const defaultValues = {
    menuAssignId: "",
    role: "",
    menuId: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Menu Assign to Role"
        btn="Return"
        path="/grapes/settings/role/access"
      />
      <MenuAssignRoleForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/MenuAssignRole/create"
        returnPath="/grapes/settings/role/access"
        isEdit={false}
      />
    </div>
  );
};

export default MenuAssignRoleAdd;
