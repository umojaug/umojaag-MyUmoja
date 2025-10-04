import React, { useState } from "react";
import MyTimeLogSummeryList from "./MyTimeLogSummeryList";
import TopHeader from "../../../components/TopHeader";
import SearchDateRange from "../../../components/SearchDateRange";

const TimeLogSummeryReport = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title=" Time Log Summery Report" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <MyTimeLogSummeryList dataForm={dataForm} />}
    </div>
  );
};

export default TimeLogSummeryReport;
