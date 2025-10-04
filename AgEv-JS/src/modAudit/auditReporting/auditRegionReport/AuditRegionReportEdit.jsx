import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";
import AuditRegionReportForm from "./AuditRegionReportForm";

const AuditRegionReportEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "auditAuditBranchDepartmentAuditReport",
    `/AuditRegionReport/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Region Audit Report Edit"
        btn="Return"
        path="/audit/reporting/region/list"
      />

      <AuditRegionReportForm
        defaultValues={{
          reportId: list.data.reportId,
          reportingQuarter: list.data.reportingQuarter,
          monthOfAudit: list.data.monthOfAudit,
          departmentId: list.data.departmentId,
          regionId: list.data.regionId,
          regionOverview: list.data.regionOverview,
        }}
        action={refetch}
        btnText="Update"
        path="/AuditRegionReport/Update"
        returnPath="/audit/reporting/region/list"
      />
    </div>
  );
};

export default AuditRegionReportEdit;
