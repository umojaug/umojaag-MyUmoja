import React from "react";
import TopHeader from "../../components/TopHeader";
import AdvanceSalaryForm from "./AdvanceSalaryForm";

const AdvanceSalaryAdd = () => {
  const defaultValues = {
    advanceAmount: "",
    purposeOfAdvance: "",
    neededAdvanceDate: new Date(),
    pinName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="My Advance Salary Application"
        btn="Return"
        path="/advanceSalary/myAdvanceSalary/list"
      />
      <AdvanceSalaryForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/myAdvanceSalary/create"
        returnPath="/advanceSalary/myAdvanceSalary/list"
      />
    </div>
  );
};

export default AdvanceSalaryAdd;
