import React from "react";
import TopHeader from "../../components/TopHeader";
import EmpSalaryStopForm from "./EmpSalaryStopForm";

const EmpSalaryStopAdd = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Stop Current Month Salary"
        btn="Return"
        path="/hr/salary/stop/list"
      />
      <EmpSalaryStopForm
        path="/empparyrollstop/create"
        returnPath="/hr/salary/stop/list"
      />
    </div>
  );
};

export default EmpSalaryStopAdd;
