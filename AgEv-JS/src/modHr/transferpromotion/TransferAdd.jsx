import React from "react";
import TopHeader from "../../components/TopHeader";
import TransferForm from "./TransferForm";

const TransferAdd = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Transfer Create"
        btn="Return"
        path="/hr/transferpromotion/list"
      />
      <TransferForm
        action={() => {}}
        path="/emptransfer/create"
        returnPath="/hr/transferpromotion/list"
      />
    </div>
  );
};

export default TransferAdd;
