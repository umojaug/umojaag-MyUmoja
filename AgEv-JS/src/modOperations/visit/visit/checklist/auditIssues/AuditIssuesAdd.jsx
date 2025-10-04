import React from "react";
import { useParams } from "react-router-dom";
import AuditIssuesForm from "./AuditIssuesForm";
import GlobalModalForm from "../../../../../components/GlobalModalForm";

const AuditIssuesAdd = () => {
  const { id } = useParams();
  const defaultValues = {
    seAuditIssueListId: 0,
    allVisitId: id,
    issues: "",
    isSettled: "",
    pendingReason: "",
  };

  return (
    <GlobalModalForm title="Add Settlement of Audit Issues">
      <AuditIssuesForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/allSettlementAuditIssues/create"
        returnPath={`/ops/visit/preview/${id}`}
      />
    </GlobalModalForm>
  );
};

export default AuditIssuesAdd;
