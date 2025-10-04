import React from "react";
import ReceiveVoucherForm from "./ReceiveVoucherForm";
import TopHeader from "../../components/TopHeader";

const ReceiveVoucherByBank = () => {
  const defaultValues = {
    bankOrCashId: "",
    ledgerNameCode: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Receive Voucher By Bank"
        btn="Return"
        path="/ac/receiveVoucher/list"
      />
      <ReceiveVoucherForm
        defaultValues={defaultValues}
        selectPath="/acLedger/selectByBank"
        action={() => {}}
        btnText="Save"
        path="/accountGlEntry/receiveCreate"
        returnPath="/ac/receiveVoucher/list"
        label="Select Bank"
      />
    </div>
  );
};

export default ReceiveVoucherByBank;
