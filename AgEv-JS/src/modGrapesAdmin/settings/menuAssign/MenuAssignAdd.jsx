import React from "react";
import TopHeader from "../../../components/TopHeader";
import MenuAssignForm from "./MenuAssignForm";

const MenuAssignAdd = () => {
  const defaultValues = {
    menuAssignId: "",
    userId: "",
    menuId: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Menu Assign to user"
        btn="Return"
        path="/grapes/settings/menu/assign/list"
      />
      <MenuAssignForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/menuAssign/create"
        returnPath="/grapes/settings/menu/assign/list"
        isEdit={false}
      />
    </div>
  );
};

export default MenuAssignAdd;
