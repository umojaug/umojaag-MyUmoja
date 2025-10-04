import React from "react";
import AuditSpecialInvestigationReportForm from "./AuditSpecialInvestigationReportForm";
import TopHeader from "../../../components/TopHeader";

const AuditSpecialInvestigationReportAdd = () => {
  const defaultValues = {
    reportId: "",
    reportingQuarter: "",
    monthOfAudit: "",
    departmentId: "",
    branchId: "1001",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Special Investigation Audit Report Create"
        btn="Return"
        path="/audit/reporting/Special/Investigation/list"
      />
      <AuditSpecialInvestigationReportForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditSpecialInvestigationReport/create"
        returnPath="/audit/reporting/Special/Investigation/list"
      />
    </div>
  );
};

export default AuditSpecialInvestigationReportAdd;
