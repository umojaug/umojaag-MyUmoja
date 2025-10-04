import React from "react";
import TopHeader from "../../../components/TopHeader";
import AuditPlaningDetailsFrom from "./AuditPlaningDetailsFrom";
import { useParams } from "react-router-dom";

const AuditPlaningDetailsAdd = () => {
  const { id } = useParams();
  const defaultValues = {
    planDetailsId: 0,
    planMasterId: id,
    fraud: "",
    staffTurnover: 0,
    inherentRisk: "",
    fieldDays: "0",
    residualRisk: "",
    selectedForAuditPeriod: "",
    budget: "0",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Branch Follow up Add"
        btn="Return"
        path="/audit/planning"
      />
      <AuditPlaningDetailsFrom
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditPlan/create"
        returnPath="/audit/planning"
      />
    </div>
  );
};

export default AuditPlaningDetailsAdd;
