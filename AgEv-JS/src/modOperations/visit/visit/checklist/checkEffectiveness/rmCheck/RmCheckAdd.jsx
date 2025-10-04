import React from "react";
import { useParams } from "react-router-dom";
import RmCheckForm from "./RmCheckForm";
import GlobalModalForm from "../../../../../../components/GlobalModalForm";

const RmCheckAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    allRmEffectId: 0,
    allVisitId: id,
    strength: "",
    weakness: "",
    actionTaken: "",
  };

  return (
    <GlobalModalForm title="Effectiveness of RM visit: ">
      <RmCheckForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/allRmEffectiveness/create"
        returnPath={`/ops/visit/preview/${id}`}
      />
    </GlobalModalForm>
  );
};

export default RmCheckAdd;
