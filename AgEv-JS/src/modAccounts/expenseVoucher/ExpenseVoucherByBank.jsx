import React from "react";
import ExpenseVoucherForm from "./ExpenseVoucherForm";
import TopHeader from "../../components/TopHeader";

const ExpenseVoucherByBank = () => {
  const defaultValues = {
    bankOrCashId: "",
    ledgerNameCode: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Expense Voucher By Bank"
        btn="Return"
        path="/ac/expenseVoucher/list"
      />
      <ExpenseVoucherForm
        defaultValues={defaultValues}
        selectPath="/acLedger/selectByBank"
        action={() => {}}
        btnText="Save"
        path="/accountGl/expenseCreate"
        returnPath="/ac/expenseVoucher/list"
        label="Select Bank"
      />
    </div>
  );
};

export default ExpenseVoucherByBank;
