import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmployeeHistoryList from "./EmployeeHistoryList";
import SearchDateRange from "../../../components/SearchDateRange";

const EmployeeHistory = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Transfer, Promotion and Demotion List" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <EmployeeHistoryList dataForm={dataForm} />}
    </div>
  );
};

export default EmployeeHistory;
