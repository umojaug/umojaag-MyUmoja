import React from "react";
import TopHeader from "../../../components/TopHeader";
import SubMenuAssignForm from "./SubMenuAssignForm";

const SubMenuAssignAdd = () => {
  const defaultValues = {
    userId: "",
    subMenuId: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Sub Menu Assign to user"
        btn="Return"
        path="/grapes/settings/submenu/assign/list"
      />
      <SubMenuAssignForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/subMenuAssign/create"
        returnPath="/grapes/settings/menu/assign/list"
        isEdit={false}
      />
    </div>
  );
};

export default SubMenuAssignAdd;
