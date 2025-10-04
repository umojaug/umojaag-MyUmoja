import React from "react";
import TopHeader from "../../../components/TopHeader";
import EvaluationTypeForm from "./EvaluationTypeForm";

const EvaluationTypeAdd = () => {
  const defaultValues = {
    evaluationTypeId: "",
    evaluationTypeName: "",
    frequency: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Evaluation Type"
        btn="Return"
        path="/hr/evaluation/type/list"
      />
      <EvaluationTypeForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/evaluationtype/create"
        returnPath="/hr/evaluation/type/list"
      />
    </div>
  );
};

export default EvaluationTypeAdd;
