import React, { useState } from "react";
import SearchEvaluation from "../../../components/SearchEvaluation";
import TopHeader from "../../../components/TopHeader";
import CompleteList from "./CompleteList";

const Complete = () => {
  const [dataForm, setDataForm] = useState("");
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Evaluation Complete List" />
      <SearchEvaluation action={setDataForm} />
      {dataForm && <CompleteList dataForm={dataForm} />}
    </div>
  );
};

export default Complete;
