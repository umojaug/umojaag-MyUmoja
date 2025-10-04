import React from "react";
import { useParams } from "react-router-dom";
import BmCheckForm from "./BmCheckForm";
import GlobalModalForm from "../../../../../../components/GlobalModalForm";


const BmCheckAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    allBmEffectId: 0,
    allVisitId: id,
    strength: "",
    weakness: "",
    actionTaken: "",
  };

  return (
    <GlobalModalForm title="Effectiveness of BM visit: ">
      <BmCheckForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/allBmEffectiveness/create"
        returnPath={`/ops/visit/preview/${id}`}
      />
    </GlobalModalForm>
  );
};

export default BmCheckAdd;
