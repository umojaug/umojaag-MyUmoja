import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import SearchDateRange from "../../../components/SearchDateRange";
import EmpPayrollSaccoList from "./EmpPayrollSaccoList";

const EmpPayrollSaccoSearch = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Sacco List" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <EmpPayrollSaccoList dataForm={dataForm} />}
    </div>
  );
};

export default EmpPayrollSaccoSearch;
