import React from "react";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import AuditIssuesForm from "./AuditIssuesForm";
import GlobalModalForm from "../../../../../components/GlobalModalForm";
import { AiOutlineForm } from "react-icons/ai";

const AuditIssuesEdit = ({ id }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "AllSettlementAuditIssues",
    `/allSettlementAuditIssues/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <GlobalModalForm
      title="Edit Today’s burning issues "
      buttonIcon={<AiOutlineForm size={24} />}
      buttonClassName="btn-sky w-12 h-10"
    >
      <AuditIssuesForm
        defaultValues={{
          seAuditIssueId: list.data.seAuditIssueId,
          allVisitId: list.data.allVisitId,
          issues: list.data.issues,
          isSettled: list.data.isSettled,
          pendingReason: list.data.pendingReason,
        }}
        action={refetch}
        btnText="Update"
        path="/allSettlementAuditIssues/update"
        returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
      />
    </GlobalModalForm>
  );
};

export default AuditIssuesEdit;
