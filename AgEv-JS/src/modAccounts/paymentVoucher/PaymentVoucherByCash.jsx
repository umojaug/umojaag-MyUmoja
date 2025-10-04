import React from "react";
import PaymentVoucherForm from "./PaymentVoucherForm";
import TopHeader from "../../components/TopHeader";

const PaymentVoucherByCash = () => {
  const defaultValues = {
    bankOrCashId: "",
    ledgerNameCode: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Payment Voucher By Cash"
        btn="Return"
        path="/ac/paymentVoucher/list"
      />
      <PaymentVoucherForm
        defaultValues={defaultValues}
        selectPath="/acLedger/selectByCash"
        action={() => {}}
        btnText="Save"
        path="/accountGl/paymentCreate"
        returnPath="/ac/paymentVoucher/list"
        label="Select Cash"
      />
    </div>
  );
};

export default PaymentVoucherByCash;
