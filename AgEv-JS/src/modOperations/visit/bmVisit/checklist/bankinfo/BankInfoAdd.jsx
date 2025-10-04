import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import { useParams } from "react-router-dom";
import BankInfoForm from "./BankInfoForm";

const BankInfoIdAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    opsBmBankInfoId: 0,
    bmVisitId: id,
    fundReceivedBranch: "",
    fundReceivedAmount: 0,
    fundTransferBranch: "",
    fundTransferAmount: 0,
    bankWithdraw: 0,
    bankDeposit: 0,
    bankBalance: 0,
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="6. Bank information: "
        btn="Return"
        path={`/ops/bm/visit/preview/${id}`}
      />
      <BankInfoForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/bmBankInfo/create"
        returnPath={`/ops/bm/visit/preview/${id}`}
      />
    </div>
  );
};

export default BankInfoIdAdd;
