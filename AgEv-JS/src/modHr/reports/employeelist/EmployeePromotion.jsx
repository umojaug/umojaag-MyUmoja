import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import EmployeePromotionList from "./EmployeePromotionList";
import SearchDateRange from "../../../components/SearchDateRange";

const EmployeePromotion = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Promotion List" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <EmployeePromotionList dataForm={dataForm} />}
    </div>
  );
};

export default EmployeePromotion;
