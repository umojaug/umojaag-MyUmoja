import React from "react";

import TopHeader from "../../../components/TopHeader";
import ExpenseForm from "./ExpenseForm";

const ExpenseAdd = () => {
  const defaultValues = {
    expenseid: "",
    expenseName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Expense"
        btn="Return"
        path="/ac/settings/expense/list"
      />
      <ExpenseForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/expenses/create"
        returnPath="/ac/settings/expense/list"
      />
    </div>
  );
};

export default ExpenseAdd;
