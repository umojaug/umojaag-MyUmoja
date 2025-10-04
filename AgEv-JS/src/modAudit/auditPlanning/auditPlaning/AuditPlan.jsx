import React from "react";
import AuditPlaningDetailsList from "./AuditPlaningDetailsList";
import AuditPlanMaster from "./AuditPlanMaster";

const AuditPlan = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      <AuditPlanMaster />
      <AuditPlaningDetailsList />
    </div>
  );
};

export default AuditPlan;
