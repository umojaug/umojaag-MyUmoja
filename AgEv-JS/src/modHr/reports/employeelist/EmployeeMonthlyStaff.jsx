import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmployeeMonthlyStaffList from "./EmployeeMonthlyStaffList";
import SearchDateRange from "../../../components/SearchDateRange";

const EmployeeMonthlyStaff = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Periodic Staff Position" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <EmployeeMonthlyStaffList dataForm={dataForm} />}
    </div>
  );
};

export default EmployeeMonthlyStaff;
