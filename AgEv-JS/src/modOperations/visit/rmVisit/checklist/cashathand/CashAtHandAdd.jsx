import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import { useParams } from "react-router-dom";
import CashAtHandForm from "./CashAtHandForm";

const CashAtHandAdd = () => {
  const { id } = useParams();
  const defaultValues = {
    opsRmCashAtHandId: 0,
    rmVisitId: id,
    cashbookAmount: 0,
    physicalAmount: 0,
    remarks: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Cash at hand information"
        btn="Return"
        path={`/ops/rm/visit/preview/${id}`}
      />
      <CashAtHandForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/rmCashAtHand/create"
        returnPath={`/ops/rm/visit/preview/${id}`}
      />
    </div>
  );
};

export default CashAtHandAdd;
