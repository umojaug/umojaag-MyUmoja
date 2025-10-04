import React from "react";
import TopHeader from "../../../../components/TopHeader";
import LeaveEmpForm from "./LeaveBalanceForm";

const LeaveBalanceAdd = () => {
  const defaultValues = {
    pinName: "",
    annualLeave: "",
    annualLeaveExpt: "",
    compassionateLeave: "",
    paternityLeave: "",
    maternityLeave: "",
    sickLeave: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Leave Opening Balance" btn="Return" path="/hr/leave" />
      <LeaveEmpForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/leaveOpennigBalance/create"
        returnPath="/hr/leave"
      />
    </div>
  );
};

export default LeaveBalanceAdd;
