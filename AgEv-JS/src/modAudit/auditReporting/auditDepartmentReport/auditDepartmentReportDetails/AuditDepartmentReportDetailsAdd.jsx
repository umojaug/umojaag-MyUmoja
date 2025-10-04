import React from "react";
import TopHeader from "../../../../components/TopHeader";
import AuditDepartmentReportDetailsForm from "./AuditDepartmentReportDetailsForm";

const AuditDepartmentReportDetailsAdd = () => {
  const defaultValues = {
    reportId: "",
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
        title="Departmental Audit Report Create"
        btn="Return"
        path="/audit/reporting/department/list"
      />
      <AuditDepartmentReportDetailsForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/AuditDepartmentReport/create"
        returnPath="/audit/reporting/department/list"
      />
    </div>
  );
};

export default AuditDepartmentReportDetailsAdd;
