import React, { useState } from "react";
import TopHeader from "../../components/TopHeader";
import SearchHeader from "../../components/SearchHeader";
import TransferSearch from "./TransferSearch";

const TransferList = () => {
  const [query, setQuery] = useState("");

  return (
    <>
      <TopHeader title="Transfer List" btn="Save" path="/hr/transfer/add" />
      <SearchHeader placeholder="PIN / Name" action={setQuery} />
      {query && <TransferSearch query={query} />}
    </>
  );
};

export default TransferList;
