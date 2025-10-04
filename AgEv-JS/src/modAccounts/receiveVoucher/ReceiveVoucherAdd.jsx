import React from "react";
import ReceiveVoucherForm from "./ReceiveVoucherForm";

const ReceiveVoucherAdd = ({ refetch }) => {
  const defaultValues = {
    bankOrCashId: "",
    receiveId: "",
    amount: "",
    dr: "",
    cr: "",
    particulars: "",
  };
  return (
    <ReceiveVoucherForm
      defaultValues={defaultValues}
      action={refetch}
      btnText="Save"
      path="/voucher/create/receive"
    />
  );
};

export default ReceiveVoucherAdd;
