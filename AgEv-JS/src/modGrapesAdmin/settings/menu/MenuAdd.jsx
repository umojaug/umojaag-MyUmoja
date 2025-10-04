import React from "react";
import TopHeader from "../../../components/TopHeader";
import ModuleForm from "./MenuForm";

const MenuAdd = () => {
  const defaultValues = {
    menuId: "0",
    moduleId: "",
    menuName: "",
    link: "",
    icon: "",
    iconMobile: "",
    priority: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Menu"
        btn="Return"
        path="/grapes/settings/menu/list"
      />
      <ModuleForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/adMenu/create"
        returnPath="/grapes/settings/menu/list"
      />
    </div>
  );
};

export default MenuAdd;
