import React from "react";
import TopHeader from "../../../../components/TopHeader";
import EvaluationForm from "./EvaluationForm";

const EvaluationAdd = () => {
  const defaultValues = {
    evaluationId: "",
    evaluationTypeId: "",
    managerId: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Evaluation Create"
        btn="Return"
        path="/my/evaluation/list"
      />
      <EvaluationForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/evaluation/create"
        returnPath="/my/evaluation/list"
      />
    </div>
  );
};

export default EvaluationAdd;
