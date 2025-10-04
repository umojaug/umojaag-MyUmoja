import React, { useState } from "react";
import TopHeader from "../../components/TopHeader";
import SearchHeader from "../../components/SearchHeader";
import AllowanceDeductionSearch from "./AllowanceDeductionSearch";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AllowanceDeductionList = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Allowance / Deduction List"
        btn="Save"
        path="/hr/allowance-deduction/add"
      />
      <div className="">
        <button
          className="btn-umojayellow "
          onClick={() => navigate("/hr/allowance-deduction/fileUpload")}
        >
          <AiOutlineCloudUpload size={30} className="mr-2" />
          Upload file
        </button>
      </div>
      <SearchHeader placeholder="PIN / Name" action={setQuery} />
      {query && <AllowanceDeductionSearch query={query} />}
    </div>
  );
};

export default AllowanceDeductionList;
