import React from "react";
import LeaveMyApplications from "./LeaveMyApplications";
import LeaveMyBalance from "./LeaveMyBalance";
import TopHeader from "./../../components/TopHeader";

const LeaveList = () => {
  return (
    <div className="card w-full max-w-screen-xl gap-5">
      <TopHeader title="My Leave" btn="Save" path="/my/leave/add" />
      <LeaveMyBalance />
      <LeaveMyApplications />
    </div>
  );
};

export default LeaveList;
