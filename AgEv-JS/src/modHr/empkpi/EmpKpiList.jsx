import React, { useState } from "react";
import TopHeader from "../../components/TopHeader";
import SearchHeader from "../../components/SearchHeader";
import EmpKpiSearch from "./EmpKpiSearch";

const EmpKpiList = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Kpi List" btn="Save" path="/hr/kpi/add" />
      <SearchHeader placeholder="PIN / Name" action={setQuery} />
      {query && <EmpKpiSearch query={query} />}
    </div>
  );
};

export default EmpKpiList;
