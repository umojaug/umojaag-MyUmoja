import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import SearchHeader from "../../../components/SearchHeader";
import MenuAssignSearch from "./MenuAssignSearch";

const MenuAssignList = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Menu Assign"
        btn="Save"
        path="/grapes/settings/menu/assign/Add"
      />
      <SearchHeader placeholder="Name" action={setQuery} />
      {query && <MenuAssignSearch query={query} />}
    </div>
  );
};

export default MenuAssignList;
