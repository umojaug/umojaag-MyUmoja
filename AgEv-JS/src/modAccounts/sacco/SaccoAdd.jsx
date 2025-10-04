import React from "react";
import TopHeader from "../../components/TopHeader";
import SaccoForm from "./SaccoForm";

const SaccoAdd = () => {
  const defaultValues = {
    pinName: "",
    withdraw: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Sacco Withdraw"
        btn="Return"
        path="/ac/sacco/withdraw/list"
      />
      <SaccoForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/acsaccos/withdraw"
        returnPath="/ac/sacco/withdraw/list"
      />
    </div>
  );
};

export default SaccoAdd;
