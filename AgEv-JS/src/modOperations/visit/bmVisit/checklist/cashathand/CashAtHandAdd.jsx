import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import { useParams } from "react-router-dom";
import CashAtHandForm from "./CashAtHandForm";

const CashAtHandAdd = () => {
  const { id } = useParams();
  const defaultValues = {
    opsBmCashAtHandId: 0,
    bmVisitId: id,
    openingBalance: "",
    closingBalance: "",
    aboveCeilingReason: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="5.Cash at hand information"
        btn="Return"
        path={`/ops/bm/visit/preview/${id}`}
      />
      <CashAtHandForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/bmCashAtHand/create"
        returnPath={`/ops/bm/visit/preview/${id}`}
      />
    </div>
  );
};

export default CashAtHandAdd;
