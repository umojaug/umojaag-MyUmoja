import React from "react";
import TopHeader from "../../components/TopHeader";
import LeaveForm from "./LeaveForm";

const LeaveAdd = () => {
  const defaultValues = {
    pinName: "",
    attendanceStatus: "",
    fromDate: new Date(),
    tillDate: new Date(),
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Leave Create" btn="Return" path="/hr/leave/list" />
      <LeaveForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/empleave/create"
        returnPath="/hr/leave/list"
      />
    </div>
  );
};

export default LeaveAdd;
