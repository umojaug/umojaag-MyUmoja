import React from "react";
import { useGetData } from "../../../hooks/dataApi";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import AuditTrackerIssueForm from "./AuditTrackerIssueForm";

const AuditTrackerIssueEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("AuditTrackerIssue", `/AuditTrackerIssue/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Tracker Issue Audit Update"
        btn="Return"
        path="/audit/others/trackerissue/list"
      />

      <AuditTrackerIssueForm
        defaultValues={{
          auditTrackerIssueId: list.data.auditTrackerIssueId,
          auditType: list.data.auditType,
          year: list.data.year,
          monthOfAudit: list.data.monthOfAudit,
          departmentId: list.data.departmentId,
          branchId: list.data.branchId,
          regionId: list.data.regionId,
          auditIssue: list.data.auditIssue,
          risk: list.data.risk,
          recommendations: list.data.recommendations,
          implementedBy: list.data.implementedBy,
          commitmentDate: list.data.commitmentDate,
          implementationDate: list.data.implementationDate,
          issueStatus: list.data.issueStatus,
          iaInCharge: list.data.iaInCharge,
          followUpDate: list.data.followUpDate,
        }}
        action={refetch}
        btnText="Update"
        path="/AuditTrackerIssue/Update"
        returnPath="/audit/others/trackerissue/list"
      />
    </div>
  );
};

export default AuditTrackerIssueEdit;
