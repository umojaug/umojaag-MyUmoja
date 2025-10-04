import React from "react";
import TopHeader from "../../../components/TopHeader";
import SubMenuForm from "./SubMenuForm";

const SubMenuAdd = () => {
  const defaultValues = {
    subMenuId: "0",
    menuId: "",
    subMenuName: "",
    link: "",
    icon: "",
    iconMobile: "",
    priority: "",
    section: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Sub Menu"
        btn="Return"
        path="/grapes/settings/sub/menu/list"
      />
      <SubMenuForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/adSubMenu/create"
        returnPath="/grapes/settings/sub/menu/list"
      />
    </div>
  );
};

export default SubMenuAdd;
