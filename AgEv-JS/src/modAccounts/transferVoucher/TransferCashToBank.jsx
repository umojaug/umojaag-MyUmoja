import React from "react";
import TopHeader from "../../components/TopHeader";
import TransferCashToBankForm from "./TransferCashToBankForm";

const TransferVoucherCashToBank = () => {
  const defaultValues = {
    bankOrCashId: "",
    ledgerNameCode: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Transfer Voucher Cash To Bank"
        btn="Return"
        path="/ac/transferVoucher/list"
      />
      <TransferCashToBankForm
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

export default TransferVoucherCashToBank;
