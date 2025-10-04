import React from "react";
import TopHeader from "../../components/TopHeader";
import AllowanceDeductionForm from "./AllowanceDeductionForm";

const AllowanceDeductionAdd = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Allowance Deduction Create"
        btn="Return"
        path="/hr/allowance-deduction/list"
      />
      <AllowanceDeductionForm
        path="/empallded/create"
        returnPath="/hr/allowance-deduction/list"
      />
    </div>
  );
};

export default AllowanceDeductionAdd;
