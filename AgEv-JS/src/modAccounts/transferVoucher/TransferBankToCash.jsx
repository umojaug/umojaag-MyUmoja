import React from "react";

import TopHeader from "../../components/TopHeader";
import TransferBankToCashForm from "./TransferBankToCashForm";


const TransferVoucherBankToCash = () => {
  const defaultValues = {
    bankOrCashId: "",
    ledgerNameCode: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Transfer Voucher Bank To Cash"
        btn="Return"
        path="/ac/transferVoucher/list"
      />
      <TransferBankToCashForm
        defaultValues={defaultValues}
        selectPath="/acLedger/selectByBank"
        action={() => {}}
        btnText="Save"
        path="/accountGl/transferCreate"
        returnPath="/ac/transferVoucher/list"
      />
    </div>
  );
};

export default TransferVoucherBankToCash;
