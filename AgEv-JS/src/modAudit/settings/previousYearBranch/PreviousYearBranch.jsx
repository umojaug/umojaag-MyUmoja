import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import PreviousYearBranchList from "./PreviousYearBranchList";

const PreviousYearBranch = () => {
  const navigate = useNavigate();

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title=" Previous year branch data"
        // btn="Save"
        // path="/audit/settings/previousdata/add"
      />
      <div className="">
        <button
          className="btn-umojayellow "
          onClick={() => navigate("/audit/settings/previousdata/fileUpload")}
        >
          <AiOutlineCloudUpload size={30} className="mr-2" />
          Upload file
        </button>
      </div>
      {/* <SearchHeader placeholder="PIN / Name" action={setQuery} />
      {query && <AllowanceDeductionSearch query={query} />} */}

      <PreviousYearBranchList />
    </div>
  );
};

export default PreviousYearBranch;
