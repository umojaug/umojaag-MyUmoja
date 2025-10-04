import React from "react";
import TopHeader from "../../components/TopHeader";
import IncomeVoucherForm from "./IncomeVoucherForm";

const IncomeVoucherByCash = () => {
  const defaultValues = {
    bankOrCashId: "",
    ledgerNameCode: "",
    amount: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Income Voucher By Cash"
        btn="Return"
        path="/ac/incomeVoucher/list"
      />
      <IncomeVoucherForm
        defaultValues={defaultValues}
        selectPath="/acLedger/selectByCash"
        action={() => {}}
        btnText="Save"
        path="/accountGlEntry/incomeCreate"
        returnPath="/ac/incomeVoucher/list"
        label="Select Cash"
      />
    </div>
  );
};

export default IncomeVoucherByCash;
