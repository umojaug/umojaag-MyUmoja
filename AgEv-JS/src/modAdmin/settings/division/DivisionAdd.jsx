import React from "react";
import TopHeader from "../../../components/TopHeader";
import DivisionForm from "./DivisionForm";

const DivisionAdd = () => {
  const defaultValues = {
    divisionId: "",
    divisionName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Division"
        btn="Return"
        path="/admin/settings/division/list"
      />
      <DivisionForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/divisions/create"
        returnPath="/admin/settings/division/list"
      />
    </div>
  );
};

export default DivisionAdd;
