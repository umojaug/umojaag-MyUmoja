import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import SearchDateTill from "../../../components/SearchDateTill";
import ActiveEmployeeList from "./ActiveEmployeeList";

const ActiveEmployee = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Active Employees" />
      <SearchDateTill action={setDataForm} />
      {dataForm && <ActiveEmployeeList dataForm={dataForm} />}
    </div>
  );
};

export default ActiveEmployee;
