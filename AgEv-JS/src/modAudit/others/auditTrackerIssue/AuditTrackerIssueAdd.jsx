import React from "react";
import AuditTrackerIssueForm from "./AuditTrackerIssueForm";
import TopHeader from "../../../components/TopHeader";

const AuditTrackerIssueAdd = () => {
  const defaultValues = {
    auditTrackerIssueId: "",
    auditType: "",
    year: "",
    monthOfAudit: "",
    departmentId: "",
    branchId: "",
    regionId: "",
    auditIssue: "",
    risk: "",
    recommendations: "",
    implementedBy: "",
    commitmentDate: "",
    implementationDate: "",
    issueStatus: "",
    iaInCharge: "",
    followUpDate: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Audit TrackerIssue Create"
        btn="Return"
        path="/audit/others/trackerissue/list"
      />
      <AuditTrackerIssueForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/AuditTrackerIssue/create"
        returnPath="/audit/others/trackerissue/list"
      />
    </div>
  );
};

export default AuditTrackerIssueAdd;
