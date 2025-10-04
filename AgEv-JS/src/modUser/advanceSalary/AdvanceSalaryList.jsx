import React from "react";
import TopHeader from "../../components/TopHeader";
import AdvanceSalaryApplications from "./AdvanceSalaryApplications";

const AdvanceSalaryList = () => {
  return (
    <div className="card w-full max-w-screen-xl gap-5">
      <TopHeader
        title="Advance Salary"
        btn="Save"
        path="/advanceSalary/myAdvanceSalary/add"
      />
      {/* <LeaveMyBalance /> */}
      <AdvanceSalaryApplications />
    </div>
  );
};

export default AdvanceSalaryList;
