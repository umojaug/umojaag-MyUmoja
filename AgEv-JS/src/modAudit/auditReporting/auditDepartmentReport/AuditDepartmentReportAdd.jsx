import React from "react";
import TopHeader from "../../../components/TopHeader";
import AuditDepartmentReportForm from "./AuditDepartmentReportForm";

const AuditDepartmentReportAdd = () => {
  const defaultValues = {
    reportId: "",
    reportingQuarter: "",
    monthOfAudit: "",
    departmentId: "",
    branchId: "",
    departmentOverview: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Departmental Audit Report Create"
        btn="Return"
        path="/audit/reporting/department/list"
      />
      <AuditDepartmentReportForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/AuditDepartmentReport/create"
        returnPath="/audit/reporting/department/list"
      />
    </div>
  );
};

export default AuditDepartmentReportAdd;
