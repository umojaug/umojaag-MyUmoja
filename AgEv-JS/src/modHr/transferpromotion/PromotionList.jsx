import React, { useState } from "react";
import TopHeader from "../../components/TopHeader";
import SearchHeader from "../../components/SearchHeader";
import PromotionSearch from "./PromotionSearch";

const PromotionList = () => {
  const [query, setQuery] = useState("");

  return (
    <>
      <TopHeader title="Promotion List" btn="Save" path="/hr/promotion/add" />
      <SearchHeader placeholder="PIN / Name" action={setQuery} />
      {query && <PromotionSearch query={query} />}
    </>
  );
};

export default PromotionList;
