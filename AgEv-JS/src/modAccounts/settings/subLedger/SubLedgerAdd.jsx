import React from "react";
import TopHeader from "../../../components/TopHeader";
import SubLedgerForm from "./SubLedgerForm";

const SubLedgerAdd = () => {
  const defaultValues = {
    subLedgerId: "",
    ledgerId: "",
    subLedgerName: "",

  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Sub Ledger"
        btn="Return"
        path="/ac/settings/subledger/list"
      />
      <SubLedgerForm
        defaultValues={defaultValues}
        action={() => { }}
        btnText="Save"
        path="/acSubLedger/create"
        returnPath="/ac/settings/subLedger/list"
      />
    </div>
  );
};

export default SubLedgerAdd;
