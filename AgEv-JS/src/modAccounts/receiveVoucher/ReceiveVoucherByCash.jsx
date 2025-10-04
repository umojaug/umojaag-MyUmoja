import React from "react";
import ReceiveVoucherForm from "./ReceiveVoucherForm";
import TopHeader from "../../components/TopHeader";

const ReceiveVoucherByCash = () => {
  const defaultValues = {
    bankOrCashId: "",
    ledgerNameCode: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Receive Voucher By Cash"
        btn="Return"
        path="/ac/receiveVoucher/list"
      />
      <ReceiveVoucherForm
        defaultValues={defaultValues}
        selectPath="/acLedger/selectByCash"
        action={() => {}}
        btnText="Save"
        path="/accountGlEntry/receiveCreate"
        returnPath="/ac/receiveVoucher/list"
        label="Select Cash"
      />
    </div>
  );
};

export default ReceiveVoucherByCash;
