import React from "react";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import AduitIssueBmForm from "./AduitIssueBmForm";
import { AiOutlineForm } from "react-icons/ai";
import GlobalModalForm from "../../../../../components/GlobalModalForm";

const AuditIssueBmEdit = ({ id }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "allSettlementAuditIssuesdetails",
    `/allSettlementAuditIssues/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <GlobalModalForm
      title="Edit Settlement Of Audit Issues"
      buttonIcon={<AiOutlineForm size={24} />}
      buttonClassName="btn-sky w-12 h-10"
    >
      {list.data.isSubmit === 1 && (
        <AduitIssueBmForm
          defaultValues={{
            seAuditIssueId: list.data.seAuditIssueId,
            allVisitId: list.data.allVisitId,
            issues: list.data.issues,
            isSettled: list.data.isSettled,
            pendingReason: list.data.pendingReason,
            bmComments: list.data.bmComments,
          }}
          action={refetch}
          btnText="Update"
          path="/allSettlementAuditIssues/updateByBm"
          returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
        />
      )}
    </GlobalModalForm>
  );
};

export default AuditIssueBmEdit;
