import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import SearchDateRange from "../../../components/SearchDateRange";
import MonthlyEmployeeStaffList from "./MonthlyEmployeeStaffList";

const MonthlyEmployeeStaff = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Monthly Employee Search" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <MonthlyEmployeeStaffList dataForm={dataForm} />}
    </div>
  );
};

export default MonthlyEmployeeStaff;
