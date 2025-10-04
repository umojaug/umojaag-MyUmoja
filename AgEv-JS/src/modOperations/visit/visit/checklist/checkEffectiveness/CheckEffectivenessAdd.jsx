import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import { useParams } from "react-router-dom";
import CheckEffectivenessForm from "./CheckEffectivenessForm";

const CheckEffectivenessAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    allBmEffectId: 0,
    allAmEffectId: id,
    allRmEffectId: "",
    allVisitId: 0,
    strength: "",
    weakness: 0,
    actionTaken: 0,
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="6. Bank information: "
        btn="Return"
        path={`/ops/bm/visit/preview/${id}`}
      />
      <CheckEffectivenessForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/bmBankInfo/create"
        returnPath={`/ops/bm/visit/preview/${id}`}
      />
    </div>
  );
};

export default CheckEffectivenessAdd;
