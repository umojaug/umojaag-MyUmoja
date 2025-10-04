import React, { useState } from "react";
import DayBookList from "./DayBookList";
import TopHeader from "../../../../components/TopHeader";
import SearchDateRange from "../../../../components/SearchDateRange";

const DayBookReport = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Day Book" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <DayBookList dataForm={dataForm} />}
    </div>
  );
};

export default DayBookReport;
