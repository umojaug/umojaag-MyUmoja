import React from "react";
import IncomeVoucherForm from "./IncomeVoucherForm";

const IncomeVoucherAdd = ({ refetch }) => {
  const defaultValues = {
    bankOrCashId: "",
    expenseId: "",
    amount: "",
    dr: "",
    cr: "",
    particulars: "",
  };
  return (
    <IncomeVoucherForm
      defaultValues={defaultValues}
      action={refetch}
      btnText="Save"
      path="/voucher/create/income"
    />
  );
};

export default IncomeVoucherAdd;
