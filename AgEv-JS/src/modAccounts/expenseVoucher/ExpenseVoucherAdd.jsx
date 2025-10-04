import React from "react";
import ExpenseVoucherForm from "./ExpenseVoucherForm";

const ExpenseVoucherAdd = ({ refetch }) => {
  const defaultValues = {
    bankOrCashId: "",
    expenseId: "",
    amount: "",
    dr: "",
    cr: "",
    particulars: "",
  };
  return (
    <ExpenseVoucherForm
      defaultValues={defaultValues}
      action={refetch}
      btnText="Save"
      path="/voucher/create/expense"
    />
  );
};

export default ExpenseVoucherAdd;
