import React, { useState } from "react";
import TopHeader from "../../../../components/TopHeader";
import SearchDateRange from "../../../../components/SearchDateRange";
import BankBookList from "./BankBookList";

const BankBookReport = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title=" Bank Book" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <BankBookList dataForm={dataForm} />}
    </div>
  );
};

export default BankBookReport;
