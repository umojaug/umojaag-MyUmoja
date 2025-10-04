import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmpPayrollNssfList from "./EmpPayrollNssfList";
import SearchMonthYear from "../../../components/SearchMonthYear";

const EmpPayrollNssf = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="NSSF Sheet" />
      <SearchMonthYear action={setDataForm} />
      {dataForm && <EmpPayrollNssfList dataForm={dataForm} />}
    </div>
  );
};

export default EmpPayrollNssf;
