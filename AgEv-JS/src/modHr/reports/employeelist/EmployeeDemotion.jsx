import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmployeeDemotionList from "./EmployeeDemotionList";
import SearchDateRange from "../../../components/SearchDateRange";

const EmployeeDemotion = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Demotion List" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <EmployeeDemotionList dataForm={dataForm} />}
    </div>
  );
};

export default EmployeeDemotion;
