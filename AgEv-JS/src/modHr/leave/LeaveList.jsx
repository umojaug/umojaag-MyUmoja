import React, { useState } from "react";
import SearchHeader from "../../components/SearchHeader";
import LeaveSearch from "./LeaveSearch";
import ProcessButton from "../../components/button/ProcessButton";

const LeaveList = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="flex flex-col md:flex-row justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl pb-2 md:pb-0 font-bold lg:text-semibold text-gray-600">
          Leave List
        </h1>
        <ProcessButton title="Leave Process" path="/empleave/leaveprocess" />
      </div>

      <SearchHeader placeholder="PIN / Name" action={setQuery} />
      {query && <LeaveSearch query={query} />}
    </div>
  );
};

export default LeaveList;
