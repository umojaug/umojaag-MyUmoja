import React from "react";
import TopHeader from "../../components/TopHeader";
import TransferBankToBankForm from "./TransferBankToBankForm";

const TransferBankToBank = () => {
  const defaultValues = {
    bankOrCashId: "",
    ledgerNameCode: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Transfer Voucher Bank To Bank"
        btn="Return"
        path="/ac/transferVoucher/list"
      />
      <TransferBankToBankForm
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

export default TransferBankToBank;
