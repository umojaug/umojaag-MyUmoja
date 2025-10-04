import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmployeeResignList from "./EmployeeResignList";
import SearchDateRange from "../../../components/SearchDateRange";

const EmployeeResign = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Resign List" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <EmployeeResignList dataForm={dataForm} />}
    </div>
  );
};

export default EmployeeResign;
