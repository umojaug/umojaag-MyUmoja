import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmpPayrollAllDedList from "./EmpPayrollAllDedList";
import SearchDateRange from "../../../components/SearchDateRange";

const EmpPayrollAllDed = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Allowance / Deduction List" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <EmpPayrollAllDedList dataForm={dataForm} />}
    </div>
  );
};

export default EmpPayrollAllDed;
