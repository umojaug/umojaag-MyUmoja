import React, { useState } from "react";
import TopHeader from "../../components/TopHeader";
import SearchHeader from "../../components/SearchHeader";
import DemotionSearch from "./DemotionSearch";

const DemotionList = () => {
  const [query, setQuery] = useState("");

  return (
    <>
      <TopHeader title="Demotion List" btn="Save" path="/hr/demotion/add" />
      <SearchHeader placeholder="PIN / Name" action={setQuery} />
      {query && <DemotionSearch query={query} />}
    </>
  );
};

export default DemotionList;
