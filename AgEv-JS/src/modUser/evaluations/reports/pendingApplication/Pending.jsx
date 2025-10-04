import React, { useState } from "react";
import SearchEvaluation from "../../../../components/SearchEvaluation";
import PendingList from "./PendingList";
import TopHeader from "../../../../components/TopHeader";

const Pending = () => {
  const [dataForm, setDataForm] = useState("");
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Pending Application List" />
      <SearchEvaluation action={setDataForm} />
      {dataForm && <PendingList dataForm={dataForm} />}
    </div>
  );
};

export default Pending;
