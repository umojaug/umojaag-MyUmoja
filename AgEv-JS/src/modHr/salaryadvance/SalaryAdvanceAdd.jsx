import React from "react";
import TopHeader from "../../components/TopHeader";
import SalaryAdvanceForm from "./SalaryAdvanceForm";

const SalaryAdvanceAdd = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Salary Advance Create"
        btn="Return"
        path="/hr/salary-advance/list"
      />
      <SalaryAdvanceForm
        path="/empSalaryAdvance/create"
        returnPath="/hr/salary-advance/list"
      />
    </div>
  );
};

export default SalaryAdvanceAdd;
