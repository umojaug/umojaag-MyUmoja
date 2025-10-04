import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import SearchDateRange from "../../../components/SearchDateRange";
import AdvanceSalaryReportList from "./AdvanceSalaryReportList";

const AdvanceSalaryReport = () => {
  const [dataForm, setDataForm] = useState(false);
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Advance Salary Report List" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <AdvanceSalaryReportList dataForm={dataForm} />}
    </div>
  );
};

export default AdvanceSalaryReport;
