import React, { useState } from "react";
import TopHeader from "../../components/TopHeader";
import SearchHeader from "../../components/SearchHeader";
import SaccoSearch from "./SaccoSearch";

const SaccoList = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Sacco Withdraw List"
        btn="Save"
        path="/ac/sacco/withdraw"
      />
      <SearchHeader placeholder="PIN / Name" action={setQuery} />
      {query && <SaccoSearch query={query} />}
    </div>
  );
};

export default SaccoList;
