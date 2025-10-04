import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmpPayrollBankList from "./EmpPayrollBankList";
import SearchMonthYear from "../../../components/SearchMonthYear";

const EmpPayrollBank = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Bank Sheet" />
      <SearchMonthYear action={setDataForm} />
      {dataForm && <EmpPayrollBankList dataForm={dataForm} />}
    </div>
  );
};

export default EmpPayrollBank;
