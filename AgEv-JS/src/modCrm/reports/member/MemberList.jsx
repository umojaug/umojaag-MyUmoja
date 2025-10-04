import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import MemberListSearch from "./MemberListSearch";
import SearchDateRange from "../../../components/SearchDateRange";

const MemberList = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="New Member" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <MemberListSearch dataForm={dataForm} />}
    </div>
  );
};

export default MemberList;
