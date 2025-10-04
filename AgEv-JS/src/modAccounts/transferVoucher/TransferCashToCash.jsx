import React from "react";
import TopHeader from "../../components/TopHeader";
import TransferCashToCashForm from "./TransferCashToCashForm";

const TransferVoucherCashToCash = () => {
  const defaultValues = {
    bankOrCashId: "",
    ledgerNameCode: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Transfer Voucher Cash To Cash"
        btn="Return"
        path="/ac/transferVoucher/list"
      />
      <TransferCashToCashForm
        defaultValues={defaultValues}
        selectPath="/acLedger/selectByCash"
        action={() => {}}
        btnText="Save"
        path="/accountGl/transferCreate"
        returnPath="/ac/transferVoucher/list"
      />
    </div>
  );
};

export default TransferVoucherCashToCash;
