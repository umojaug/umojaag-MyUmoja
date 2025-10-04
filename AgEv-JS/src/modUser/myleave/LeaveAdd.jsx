import React from "react";
import TopHeader from "../../components/TopHeader";
import LeaveForm from "./LeaveForm";

const LeaveAdd = () => {
  const defaultValues = {
    attendanceStatus: "",
    fromDate: new Date(),
    tillDate: new Date(),
    particulars: "",
    fileUrl: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="My Leave Application" btn="Return" path="/my/leave" />
      <LeaveForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/myleave/create"
        returnPath="/my/leave"
      />
    </div>
  );
};

export default LeaveAdd;
