import React from "react";
import TopHeader from "../../../components/TopHeader";
import ModuleForm from "./ModuleForm";

const ModuleAdd = () => {
  const defaultValues = {
    moduleId: "0",
    moduleName: "",
    link: "",
    icon: "",
    iconMobile: "",
    priority: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Module"
        btn="Return"
        path="/grapes/settings/module/list"
      />
      <ModuleForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/module/create"
        returnPath="/grapes/settings/module"
      />
    </div>
  );
};

export default ModuleAdd;
