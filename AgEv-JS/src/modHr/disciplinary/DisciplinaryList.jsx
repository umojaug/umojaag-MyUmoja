import React, { useState } from "react";
import TopHeader from "../../components/TopHeader";
import SearchHeader from "../../components/SearchHeader";
import DisciplinarySearch from "./DisciplinarySearch";

const DisciplinaryList = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Disciplinary Letter List"
        btn="Save"
        path="/hr/disciplinary/add"
      />
      <SearchHeader
        placeholder="PIN / Name / Designation / Department / Branch"
        action={setQuery}
      />
      {query && <DisciplinarySearch query={query} />}
    </div>
  );
};

export default DisciplinaryList;
