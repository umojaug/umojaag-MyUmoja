import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import AuditSummaryForm from "./AuditSummaryForm";

const AuditSummaryEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditSummary", `/auditSummary/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Audit Workplan  Summary"
        btn="Return"
        path="/audit/workplanSummary/list"
      />
      <AuditSummaryForm
        defaultValues={{
          summaryId: list.data.summaryId,
          auditYear: list.data.auditYear,
          branchScCriteria: list.data.branchScCriteria,
          annualAudit: list.data.annualAudit,
          followUpAudit: list.data.followUpAudit,
          units: list.data.units,
          regionsAreas: list.data.regionsAreas,
          totalAudit: list.data.totalAudit,
          numberOfAuditStaff: list.data.numberOfAuditStaff,
        }}
        action={refetch}
        btnText="Update"
        path="/auditSummary/update"
        returnPath="/audit/workplanSummary/list"
      />
    </div>
  );
};

export default AuditSummaryEdit;
