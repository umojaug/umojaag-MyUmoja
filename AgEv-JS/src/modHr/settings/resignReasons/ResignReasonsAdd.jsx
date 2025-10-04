import React from "react";
import TopHeader from "../../../components/TopHeader";
import ResignReasonsForm from "./ResignReasonsForm";

const ResignReasonsAdd = () => {
  const defaultValues = {
    resignReasonId: "",
    resignReasonName: "",
    resignStatus: "Active",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Resign Reasons"
        btn="Return"
        path="/hr/settings/resign-reason/list"
      />
      <ResignReasonsForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/resignreasons/create"
        returnPath="/hr/settings/resign-reason/list"
      />
    </div>
  );
};

export default ResignReasonsAdd;
