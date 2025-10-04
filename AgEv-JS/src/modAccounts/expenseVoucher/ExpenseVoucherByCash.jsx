import React from "react";
import ExpenseVoucherForm from "./ExpenseVoucherForm";
import TopHeader from "../../components/TopHeader";

const ExpenseVoucherByCash = () => {
  const defaultValues = {
    bankOrCashId: "",
    ledgerNameCode: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Expense Voucher By Cash"
        btn="Return"
        path="/ac/expenseVoucher/list"
      />
      <ExpenseVoucherForm
        defaultValues={defaultValues}
        selectPath="/acLedger/selectByCash"
        action={() => {}}
        btnText="Save"
        path="/accountGl/expenseCreate"
        returnPath="/ac/expenseVoucher/list"
        label="Select Cash"
      />
    </div>
  );
};

export default ExpenseVoucherByCash;
