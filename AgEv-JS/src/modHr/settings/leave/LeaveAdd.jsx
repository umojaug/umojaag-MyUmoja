import React from "react";
import TopHeader from "../../../components/TopHeader";
import LeaveForm from "./LeaveForm";

const LeaveAdd = () => {
  const defaultValues = {
    leaveId: "",
    leaveName: "",
    shortCode: "",
    yearlyLeave: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Leave"
        btn="Return"
        path="/hr/settings/leave/list"
      />
      <LeaveForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/leaves/create"
        returnPath="/hr/settings/leave/list"
      />
    </div>
  );
};

export default LeaveAdd;
