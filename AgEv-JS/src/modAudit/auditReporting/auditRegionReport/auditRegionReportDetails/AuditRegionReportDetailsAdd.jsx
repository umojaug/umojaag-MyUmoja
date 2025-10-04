import React from "react";
import TopHeader from "../../../components/TopHeader";
import AuditRegionReportForm from "./AuditRegionReportForm";

const AuditRegionReportDetailsAdd = () => {
  const defaultValues = {
    reportingQuarter: "",
    monthOfAudit: "",
    departmentId: "",
    regionId: "",
    regionOverview: "",
    areaOfReview: "",
    detailedAuditFinding: "",
    primaryRootCauseId: "",
    riskImplicationId: "",
    recommendations: "",
    implementedBy: "",
    riskCategory: "",
    branchResponse: "",
    managementResponse: "",
    commitmentDate: new Date(),
    overallControlsAssessment: "",
    fraudRisk: "",
    repeatFinding: "",
    followUpCommentIfAny: "",
    iAInCharge: "",
    appendicies: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Region Audit Report Create"
        btn="Return"
        path="/audit/reporting/region/list"
      />
      <AuditRegionReportForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/AuditRegionReport/create"
        returnPath="/audit/reporting/region/list"
      />
    </div>
  );
};

export default AuditRegionReportDetailsAdd;
