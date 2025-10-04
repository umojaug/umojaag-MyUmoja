import React from "react";
import TopHeader from "../../components/TopHeader";
import EmpSalaryStopList from "./EmpSalaryStopList";

const EmpSalaryStop = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Stop Salary Sheet"
        btn="Save"
        path="/hr/payroll/salarysheet/stop"
      />
      <EmpSalaryStopList />
    </div>
  );
};

export default EmpSalaryStop;
