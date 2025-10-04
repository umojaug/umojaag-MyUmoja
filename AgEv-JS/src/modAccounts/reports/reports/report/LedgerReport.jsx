import React, { useState } from "react";
import TopHeader from "../../../../components/TopHeader";
import LedgerList from "./LedgerList";
import SearchDateAndName from "../../../../components/SearchDateAndName";

const DayBookReport = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Ledger Report Search" />
      <SearchDateAndName
        action={setDataForm}
        path="/acLedger/selectByName"
        label="Ledger Name"
      />
      {dataForm && <LedgerList dataForm={dataForm} />}
    </div>
  );
};

export default DayBookReport;
