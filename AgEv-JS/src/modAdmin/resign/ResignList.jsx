import React, { useState } from "react";
import TopHeader from "../../components/TopHeader";
import SearchHeader from "../../components/SearchHeader";
import ResignSearch from "./ResignSearch";

const ResignList = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Resign List" btn="Save" path="/hr/resign/add" />
      <SearchHeader placeholder="PIN / Name" action={setQuery} />
      {query && <ResignSearch query={query} />}
    </div>
  );
};

export default ResignList;
