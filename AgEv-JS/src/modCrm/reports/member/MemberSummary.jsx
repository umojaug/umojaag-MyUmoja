import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import MemberSummarySearch from "./MemberSummarySearch";
import SearchDateRange from "../../../components/SearchDateRange";

const MemberSummary = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Member Summary" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <MemberSummarySearch dataForm={dataForm} />}
    </div>
  );
};

export default MemberSummary;
