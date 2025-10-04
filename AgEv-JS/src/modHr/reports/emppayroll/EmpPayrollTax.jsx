import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmpPayrollTaxList from "./EmpPayrollTaxList";
import SearchMonthYear from "../../../components/SearchMonthYear";

const EmpPayrollTax = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="TAX Sheet" />
      <SearchMonthYear action={setDataForm} />
      {dataForm && <EmpPayrollTaxList dataForm={dataForm} />}
    </div>
  );
};

export default EmpPayrollTax;
