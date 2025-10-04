import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import CompleteListThree from "./CompleteListThree";
import SearchEvaluationThreeSix from "../../../components/SearchEvaluationThreeSix";

const CompleteThree = () => {
  const [dataForm, setDataForm] = useState("");
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Evaluation Complete List For Three Months"
        btn="Return"
        path="/evaluation"
      />
      <SearchEvaluationThreeSix action={setDataForm} />
      {dataForm && <CompleteListThree dataForm={dataForm} />}
    </div>
  );
};

export default CompleteThree;
