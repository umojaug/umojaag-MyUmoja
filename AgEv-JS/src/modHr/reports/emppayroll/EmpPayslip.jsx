import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmpPayslipList from "./EmpPayslipList";
import SearchMonthEmployeePin from "../../../components/SearchMonthEmployeePin";

const EmpPayslip = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Payslip" />
      <SearchMonthEmployeePin
        action={setDataForm}
        displaySearch={true}
        path="/employees/selectAll"
      />
      {dataForm && <EmpPayslipList dataForm={dataForm} />}
    </div>
  );
};

export default EmpPayslip;
