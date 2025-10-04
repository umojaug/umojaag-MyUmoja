import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import ChartOfAccountList from "./ChartOfAccountList";
import SelectBranchSearch from "../../../components/SelectBranchSearch";

const ChartOfAccountReport = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Chart Of Account" />
      <SelectBranchSearch action={setDataForm} />
      {dataForm && <ChartOfAccountList dataForm={dataForm} />}
    </div>
  );
};

export default ChartOfAccountReport;
