import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import {
  ListCol,
  ListHeader,
} from "../../../../../components/ListColWithHeader";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import DeleteButton from "../../../../../components/button/DeleteButton";
import AuditIssuesEdit from "./AuditIssuesEdit";
import AuditIssuesAdd from "./AuditIssuesAdd";
import AuditIssueBmEdit from "./AuditIssueBmEdit";
import AuditIssueManagerEdit from "./AuditIssueManagerEdit";

function AuditIssuesList({ id, isSubmit, isManager, isBm }) {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "allSettlementAuditIssues",
    `/allSettlementAuditIssues/list/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <div className="flex justify-between align-items-center">
        <TopHeader title="6.	Settlement of Audit Issues:" />
        <AuditIssuesAdd />
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-12 list-header">
          <ListHeader label="" />
          <ListHeader className="md:col-span-2 pl-6" label="Issues" />
          <ListHeader label="Is Settled" />
          <ListHeader
            className="md:col-span-2 md:pr-2"
            label="Pending Reason"
          />
          <ListHeader className="md:col-span-3 md:pr-2" label="BM Comments" />
          <ListHeader className="md:col-span-3" label="Supervisor Comments" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 list-body">
              <div className="flex gap-2">
                {isSubmit === 0 && (
                  <>
                    <AuditIssuesEdit id={item.seAuditIssueId} />
                    <DeleteButton
                      action={refetch}
                      path={`/allSettlementAuditIssues/delete/${item.seAuditIssueId}`}
                    />
                  </>
                )}
                {isSubmit === 1 && isBm === true && (
                  <>
                    <AuditIssueBmEdit id={item.seAuditIssueId} />
                  </>
                )}
                {isSubmit === 1 && isManager === true && (
                  <>
                    <AuditIssueManagerEdit id={item.seAuditIssueId} />
                  </>
                )}
              </div>
              <ListCol
                className="md:col-span-2 pl-6"
                label="Issues :"
                value={item.issues}
              />
              <ListCol
                className="md:text-center"
                label="Is Settled :"
                value={item.isSettled}
              />
              <ListCol
                className="md:col-span-2 md:pr-2"
                label="Pending Reason :"
                value={item.pendingReason}
              />
              <ListCol
                className="md:col-span-3 md:pr-2"
                label="Comments Of BM :"
                value={item.bmComments}
              />
              <ListCol
                className="md:col-span-3"
                label="Comments Of Supervisor:"
                value={item.supervisorComments}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default AuditIssuesList;
