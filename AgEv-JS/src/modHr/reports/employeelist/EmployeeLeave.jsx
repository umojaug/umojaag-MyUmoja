import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmployeeLeaveList from "./EmployeeLeaveList";
import SearchDateRange from "../../../components/SearchDateRange";

const EmployeeLeave = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Leave List" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <EmployeeLeaveList dataForm={dataForm} />}
    </div>
  );
};

export default EmployeeLeave;
