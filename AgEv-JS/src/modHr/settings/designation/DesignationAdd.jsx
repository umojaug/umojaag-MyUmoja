import React from "react";
import TopHeader from "../../../components/TopHeader";
import DesignationForm from "./DesignationForm";

const DesignationAdd = () => {
  const defaultValues = {
    designationId: "",
    designationName: "",
    kpiDetails: "",
    objectiveOne: "",
    objectiveTwo: "",
    objectiveThree: "",
    objectiveFour: "",
    roleName:""
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Designation"
        btn="Return"
        path="/hr/settings/designation/list"
      />
      <DesignationForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/designations/create"
        returnPath="/hr/settings/designation/list"
      />
    </div>
  );
};

export default DesignationAdd;
