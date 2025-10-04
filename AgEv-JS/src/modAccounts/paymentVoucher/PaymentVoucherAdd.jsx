import React from "react";
import PaymentVoucherForm from "./PaymentVoucherForm";

const PaymentVoucherAdd = ({ refetch }) => {
  const defaultValues = {
    bankOrCashId: "",
    paymentId: "",
    amount: "",
    dr: "",
    cr: "",
    particulars: "",
  };
  return (
    <PaymentVoucherForm
      defaultValues={defaultValues}
      action={refetch}
      btnText="Save"
      path="/voucher/create/payment"
    />
  );
};

export default PaymentVoucherAdd;
