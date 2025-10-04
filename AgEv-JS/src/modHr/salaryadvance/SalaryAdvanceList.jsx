import React, { useState } from "react";
import TopHeader from "../../components/TopHeader";
import SearchHeader from "../../components/SearchHeader";
import SalaryAdvanceSearch from "./SalaryAdvanceSearch";

const SalaryAdvanceList = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Salary Advance List"
        btn="Save"
        path="/hr/salary-advance/add"
      />
      <SearchHeader placeholder="PIN / Name" action={setQuery} />
      {query && <SalaryAdvanceSearch query={query} />}
    </div>
  );
};

export default SalaryAdvanceList;
