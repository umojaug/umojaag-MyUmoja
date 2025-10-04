import React from "react";
import TopHeader from "../../components/TopHeader";
import EmpKpiForm from "./EmpKpiForm";

const KpiAdd = () => {
  const defaultValues = {
    pinName: "",
    attendanceStatus: "",
    fromDate: new Date(),
    tillDate: new Date(),
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="KPI Create" btn="Return" path="/hr/kpi/list" />
      <EmpKpiForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/empkpi/create"
        returnPath="/hr/kpi/list"
      />
    </div>
  );
};

export default KpiAdd;
