import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";
import AuditBranchReportForm from "./AuditBranchReportForm";

const AuditBranchReportEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "auditAuditBranchDepartmentAuditReport",
    `/AuditBranchReport/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Branch Audit Report Edit"
        btn="Return"
        path="/audit/reporting/branch/list"
      />

      <AuditBranchReportForm
        defaultValues={{
          reportId: list.data.reportId,
          year: list.data.year,
          reportingQuarter: list.data.reportingQuarter,
          monthOfAudit: list.data.monthOfAudit,
          departmentId: list.data.departmentId,
          branchId: list.data.branchId,
          branchOverview: list.data.branchOverview,
        }}
        action={refetch}
        btnText="Update"
        path="/AuditBranchReport/Update"
        returnPath="/audit/reporting/branch/list"
      />
    </div>
  );
};

export default AuditBranchReportEdit;
