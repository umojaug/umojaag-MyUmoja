import React from "react";
import TransferVoucherForm from "./TransferVoucherForm";

const TransferVoucherAdd = ({ refetch }) => {
  const defaultValues = {
    bankOrCashId: "",
    transferToId: "",
    amount: "",
    dr: "",
    cr: "",
    particulars: "",
  };
  return (
    <TransferVoucherForm
      defaultValues={defaultValues}
      action={refetch}
      btnText="Save"
      path="/voucher/create/transfer"
    />
  );
};

export default TransferVoucherAdd;
