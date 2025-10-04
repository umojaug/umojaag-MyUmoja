import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmployeeDisciplinaryLetterList from "./EmployeeDisciplinaryLetterList";
import SearchDateRange from "../../../components/SearchDateRange";

const EmployeeDisciplinaryLetter = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Disciplinary Letter Issue List" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <EmployeeDisciplinaryLetterList dataForm={dataForm} />}
    </div>
  );
};

export default EmployeeDisciplinaryLetter;
