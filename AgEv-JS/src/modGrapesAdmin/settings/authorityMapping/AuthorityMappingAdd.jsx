import React from "react";
import TopHeader from "../../../components/TopHeader";
import AuthorityMappingForm from "./AuthorityMappingForm";

const AuthorityMappingAdd = () => {
  const defaultValues = {
    menuAssignId: "",
    role: "",
    menuId: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Authority Mapping Add"
        btn="Return"
        path="/grapes/settings/authorityMapping/list"
      />
      <AuthorityMappingForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/AuthorityMapping/create"
        returnPath="/grapes/settings/authorityMapping//list"
        isEdit={false}
      />
    </div>
  );
};

export default AuthorityMappingAdd;
