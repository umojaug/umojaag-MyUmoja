import React from "react";
import TopHeader from "../../../components/TopHeader";
import AllowanceDeductionForm from "./AllowanceDeductionForm";

const AllowanceDeductionAdd = () => {
  const defaultValues = {
    allowanceDeductionId: "",
    allowanceDeductionName: "",
    allowanceDeductionType: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Allowance / Deduction"
        btn="Return"
        path="/hr/settings/allowance-deduction/list"
      />
      <AllowanceDeductionForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/allowancedeductions/create"
        returnPath="/hr/settings/allowance-deduction/list"
      />
    </div>
  );
};

export default AllowanceDeductionAdd;
