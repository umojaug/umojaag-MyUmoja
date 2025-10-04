import React, { useState } from "react";
import TopHeader from "../../../../components/TopHeader";
import SearchDateRange from "../../../../components/SearchDateRange";
import TrialBalanceList from "./TrialBalanceList";

const TrialBalanceReport = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Trial Balance" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <TrialBalanceList dataForm={dataForm} />}
    </div>
  );
};

export default TrialBalanceReport;
