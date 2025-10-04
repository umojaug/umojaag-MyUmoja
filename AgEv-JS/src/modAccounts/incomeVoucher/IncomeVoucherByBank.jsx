import React from "react";
import TopHeader from "../../components/TopHeader";
import IncomeVoucherForm from "./IncomeVoucherForm";

const IncomeVoucherByBank = () => {
  const defaultValues = {
    bankOrCashId: "",
    ledgerNameCode: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Income Voucher By Bank"
        btn="Return"
        path="/ac/incomeVoucher/list"
      />
      <IncomeVoucherForm
        defaultValues={defaultValues}
        selectPath="/acLedger/SelectByBank"
        action={() => {}}
        btnText="Save"
        path="/accountGlEntry/incomeCreate"
        returnPath="/ac/incomeVoucher/list"
        label="Select Bank"
      />
    </div>
  );
};

export default IncomeVoucherByBank;
