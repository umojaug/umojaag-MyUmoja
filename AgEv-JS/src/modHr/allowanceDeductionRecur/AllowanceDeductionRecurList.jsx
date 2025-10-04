import React, { useState } from "react";
import TopHeader from "../../components/TopHeader";
import SearchHeader from "../../components/SearchHeader";
import AllowanceDeductionRecurSearch from "./AllowanceDeductionRecurSearch";

const AllowanceDeductionRecurList = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Recurring Allowance / Deduction List"
        btn="Save"
        path="/hr/allowance-deduction/recuring/add"
      />
      <div className=""></div>
      <SearchHeader placeholder="PIN / Name" action={setQuery} />
      {query && <AllowanceDeductionRecurSearch query={query} />}
    </div>
  );
};

export default AllowanceDeductionRecurList;
