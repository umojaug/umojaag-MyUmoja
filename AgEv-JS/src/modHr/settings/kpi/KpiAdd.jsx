import React from "react";
import TopHeader from "../../../components/TopHeader";
import KpiForm from "./KpiForm";

const KpiAdd = () => {
  const defaultValues = {
    kpiId: "",
    kpiName: "",
    details: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="New KPI" btn="Return" path="/hr/settings/kpi/list" />
      <KpiForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/kpi/create"
        returnPath="/hr/settings/kpi/list"
      />
    </div>
  );
};

export default KpiAdd;
