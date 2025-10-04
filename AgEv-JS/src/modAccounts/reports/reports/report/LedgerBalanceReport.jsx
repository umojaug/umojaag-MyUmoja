import React, { useState } from "react";
import SearchDateAndName from "../../../../components/SearchDateAndName";
import TopHeader from "../../../../components/TopHeader";
import LedgerBalanceList from "./LedgerBalanceList";

const LedgerBalanceReport = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Ledger Balance Report Search" />
      <SearchDateAndName action={setDataForm} />
      {dataForm && <LedgerBalanceList dataForm={dataForm} />}
    </div>
  );
};

export default LedgerBalanceReport;
