import React, { useState } from "react";
import TopHeader from "../../components/TopHeader";
import SearchHeader from "../../components/SearchHeader";
import EmployeeSearch from "./EmployeeSearch";

const EmployeesList = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Employee List" btn="Save" path="/hr/employee/add" />
      <SearchHeader
        placeholder="PIN / Name / Designation / Department / Branch"
        action={setQuery}
      />
      {query && <EmployeeSearch query={query} />}
    </div>
  );
};

export default EmployeesList;
