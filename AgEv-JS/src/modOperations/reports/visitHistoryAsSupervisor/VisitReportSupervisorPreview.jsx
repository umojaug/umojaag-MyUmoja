import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import PrintHeaderHtml from "../../../components/PrintHeaderHtml";
import VisitView from "../../visit/components/VisitView";
import PortfolioAnalysisList from "../../visit/visit/checklist/portfolioAnalysis/PortfolioAnalysisList";
import GroupVisitList from "../../visit/visit/checklist/groupVisit/GroupVisitList";
import BorrowerVisitList from "../../visit/visit/checklist/borrowerVisit/BorrowerVisitList";
import CashAtHandList from "../../visit/visit/checklist/cashathand/CashAtHandList";
import DocumentationList from "../../visit/visit/checklist/documentationCheck/DocumentationList";
import AuditIssuesList from "../../visit/visit/checklist/auditIssues/AuditIssuesList";
import CheckEffectivenessList from "../../visit/visit/checklist/checkEffectiveness/CheckEffectivenessList";
import FeedbackMtgList from "../../visit/visit/checklist/feedbackMtg/FeedbackMtgList";
import NameAndSign from "../../visit/visit/checklist/nameAndSign/NameAndSign";

const VisitReportSupervisorPreview = () => {
  const { id } = useParams();
  const contentRef = useRef();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("visitdetails", `/allVisit/detailsView/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl gap-2 relative">
      <div className="absolute top-4 right-20">
        <PrintHeaderHtml contentRef={contentRef} />
      </div>
      <div className="px-5 print:p-10 " ref={contentRef}>
        <VisitView

          data={list.data}
          path="/ops/reports/visitHistoryAsSupervisor"
        />

        <PortfolioAnalysisList id={id} />
        <GroupVisitList id={id} />
        <BorrowerVisitList id={id} />
        <CashAtHandList id={id} />
        <DocumentationList id={id} />
        <AuditIssuesList id={id} />
        <CheckEffectivenessList id={id} />
        <FeedbackMtgList id={id} />
        <NameAndSign id={id} data={list.data} />
      </div>
    </div>
  );
};

export default VisitReportSupervisorPreview;
