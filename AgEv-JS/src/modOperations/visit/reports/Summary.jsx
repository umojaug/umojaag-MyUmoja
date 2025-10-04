import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import SearchYear from "../../../components/SearchYear";
import SummaryList from "./SummaryList";

const Summary = () => {
  const [dataForm, setDataForm] = useState(false);
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Evaluation Summary" btn="Return" path="/evaluation" />
      <SearchYear action={setDataForm} />
      {dataForm && <SummaryList dataForm={dataForm} />}
    </div>
  );
};

export default Summary;
