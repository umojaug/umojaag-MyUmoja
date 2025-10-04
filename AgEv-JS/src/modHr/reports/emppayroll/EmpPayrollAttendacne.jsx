import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmpPayrollAttendacneList from "./EmpPayrollAttendacneList";
import SearchDateRange from "../../../components/SearchDateRange";

const EmpPayrollAttendacne = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Salary Attendance List" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <EmpPayrollAttendacneList dataForm={dataForm} />}
    </div>
  );
};

export default EmpPayrollAttendacne;
