import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmpSalaryList from "./EmpSalaryList";
import SearchMonthYear from "../../../components/SearchMonthYear";

const EmpSalary = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Salary Sheet" btn="List" path="/hr/payroll/note/list" />
      <SearchMonthYear action={setDataForm} />
      {dataForm && <EmpSalaryList dataForm={dataForm} />}
    </div>
  );
};

export default EmpSalary;
