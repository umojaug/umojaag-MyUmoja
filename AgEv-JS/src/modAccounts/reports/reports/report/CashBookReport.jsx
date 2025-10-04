import React, { useState } from "react";
import TopHeader from "../../../../components/TopHeader";
import SearchDateRange from "../../../../components/SearchDateRange";
import CashBookList from "./CashBookList";

const CashBookReport = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Cash Book" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <CashBookList dataForm={dataForm} />}
    </div>
  );
};

export default CashBookReport;
