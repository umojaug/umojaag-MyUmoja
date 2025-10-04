import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import SearchHeader from "../../../components/SearchHeader";
import SubMenuAssignSearch from "./SubMenuAssignSearch";

const SubMenuAssignList = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Sub Menu Assign"
        btn="Save"
        path="/grapes/settings/submenu/assign/Add"
      />
      <SearchHeader placeholder="Name" action={setQuery} />
      {query && <SubMenuAssignSearch query={query} />}
    </div>
  );
};

export default SubMenuAssignList;
