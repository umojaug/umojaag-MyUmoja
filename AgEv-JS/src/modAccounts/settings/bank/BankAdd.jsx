import React from "react";
import TopHeader from "../../../components/TopHeader";

import BankForm from "./BankForm";

const BankAdd = () => {
  const defaultValues = {
    bankId: "",
    bankName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="New Bank" btn="Return" path="/ac/settings/bank/list" />
      <BankForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/banks/create"
        returnPath="/ac/settings/bank/list"
      />
    </div>
  );
};

export default BankAdd;
