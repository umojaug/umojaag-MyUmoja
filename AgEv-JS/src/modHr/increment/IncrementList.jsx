import React, { useState } from "react";
import TopHeader from "../../components/TopHeader";
import SearchHeader from "../../components/SearchHeader";
// import PromotionSearch from "./IncrementSearch";
import IncrementSearch from "./IncrementSearch";

const IncrementList = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Increment List" btn="Save" path="/hr/increment/add" />
      <SearchHeader placeholder="PIN / Name" action={setQuery} />
      {query && <IncrementSearch query={query} />}
    </div>
  );
};

export default IncrementList;
