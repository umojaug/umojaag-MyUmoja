import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";
import AuditDepartmentReportForm from "./AuditDepartmentReportForm";

const AuditDepartmentReportEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "AuditDepartmentReport",
    `/AuditDepartmentReport/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Audit Department Report Edit"
        btn="Return"
        path="/audit/reporting/department/list"
      />

      <AuditDepartmentReportForm
        defaultValues={{
          reportId: list.data.reportId,
          year: list.data.year,
          reportingQuarter: list.data.reportingQuarter,
          monthOfAudit: list.data.monthOfAudit,
          departmentId: list.data.departmentId,
          branchId: list.data.branchId,
          departmentOverview: list.data.departmentOverview,
        }}
        action={refetch}
        btnText="Update"
        path="/auditDepartmentReport/update"
        returnPath="/audit/reporting/department/list"
      />
    </div>
  );
};

export default AuditDepartmentReportEdit;
