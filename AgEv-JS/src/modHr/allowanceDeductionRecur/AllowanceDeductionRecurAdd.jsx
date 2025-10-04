import React from "react";
import TopHeader from "../../components/TopHeader";
import AllowanceDeductionRecurForm from "./AllowanceDeductionRecurForm";

const AllowanceDeductionRecurAdd = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Recuring Allowance Deduction Create"
        btn="Return"
        path="/hr/allowance-deduction/recuring/list"
      />
      <AllowanceDeductionRecurForm
        path="/empAllDedRecur/create"
        returnPath="/hr/allowance-deduction/recuring/list"
      />
    </div>
  );
};

export default AllowanceDeductionRecurAdd;
