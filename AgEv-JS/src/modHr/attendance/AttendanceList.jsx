import React, { useState } from "react";
import TopHeader from "../../components/TopHeader";
import SearchHeader from "../../components/SearchHeader";
import AttendanceSearch from "./AttendanceSearch";

const AttendanceList = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Attendance List" btn="Save" path="/hr/attendance/add" />
      <SearchHeader placeholder="PIN / Name" action={setQuery} />
      {query && <AttendanceSearch query={query} />}
    </div>
  );
};

export default AttendanceList;
