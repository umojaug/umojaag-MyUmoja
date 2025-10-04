import React from "react";
import TopHeader from "../../../components/TopHeader";
import LedgerForm from "./LedgerForm";

const LedgerAdd = () => {
  const defaultValues = {
    ledgerId: "",
    subGroupId: "",
    ledgerName: "",
    displayAt: "HO",
    voucherType: "Not Applicable",
    accountType: "General",
    branchId: "",
    classificationName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Ledger"
        btn="Return"
        path="/ac/settings/ledger/list"
      />
      <LedgerForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/acLedgerSetup/create"
        returnPath="/ac/settings/ledger/list"
      />
    </div>
  );
};

export default LedgerAdd;
