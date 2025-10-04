import React from "react";

import { useParams } from "react-router-dom";
import AmCheckForm from "./AmCheckForm";
import GlobalModalForm from "../../../../../../components/GlobalModalForm";

const AmCheckAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    allAmEffectId: 0,
    allVisitId: id,
    strength: "",
    weakness: "",
    actionTaken: "",
  };

  return (
    <GlobalModalForm title="Effectiveness of AM visit: ">
      <AmCheckForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/allAmEffectiveness/create"
        returnPath={`/ops/visit/preview/${id}`}
      />
    </GlobalModalForm>
  );
};

export default AmCheckAdd;
