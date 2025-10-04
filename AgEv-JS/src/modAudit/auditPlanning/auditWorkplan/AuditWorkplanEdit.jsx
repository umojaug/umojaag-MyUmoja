import React from "react";
import AuditWorkplanForm from "./AuditWorkplanForm";
import TopHeader from "../../../components/TopHeader";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

const AuditWorkplanEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditWorkplan", `/auditWorkplan/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Audit Workplan"
        btn="Return"
        path="/audit/workplan/list"
      />
      <AuditWorkplanForm
        defaultValues={{
          workPlanId: list.data.workPlanId,
          monthName: list.data.monthName,
          branchId: list.data.branchId,
          riskRating: list.data.riskRating,
          auditor: list.data.auditor,
          fieldDays: list.data.fieldDays,
          expectedCost: list.data.expectedCost,
          auditStatus: list.data.auditStatus,
          reportStatus: list.data.reportStatus,
          discussionStatus: list.data.discussionStatus,
          followUpStatus: list.data.followUpStatus,
        }}
        action={refetch}
        btnText="Update"
        path="/auditWorkplan/update"
        returnPath="/audit/workplan/list"
      />
    </div>
  );
};

export default AuditWorkplanEdit;
