import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import VisitView from "../components/VisitView";
import PortfolioAnalysisList from "../visit/checklist/portfolioAnalysis/PortfolioAnalysisList";
import GroupVisitList from "../visit/checklist/groupVisit/GroupVisitList";
import BorrowerVisitList from "../visit/checklist/borrowerVisit/BorrowerVisitList";
import BorrowerVisitComments from "../visit/checklist/borrowerVisit/BorrowerVisitComments";
import CashAtHandList from "../visit/checklist/cashathand/CashAtHandList";
import CashAtHandComments from "../visit/checklist/cashathand/CashAtHandComments";
import DocumentationList from "../visit/checklist/documentationCheck/DocumentationList";
import DocCheckComments from "../visit/checklist/documentationCheck/DocCheckComments";
import AuditIssuesList from "../visit/checklist/auditIssues/AuditIssuesList";
import CheckEffectivenessList from "../visit/checklist/checkEffectiveness/CheckEffectivenessList";
import FeedbackMtgList from "../visit/checklist/feedbackMtg/FeedbackMtgList";
import NameAndSign from "../visit/checklist/nameAndSign/NameAndSign";

const ManagerPreview = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("visitdetails", `/allVisit/detailsView/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const isSubmit = list.data.isSubmit;

  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <div className="px-5">
        <VisitView data={list.data} path="/ops/manager/review/visit/list" />
        <PortfolioAnalysisList id={id} isSubmit={isSubmit} />

        <GroupVisitList id={id} isSubmit={isSubmit} />

        <BorrowerVisitList id={id} isSubmit={isSubmit} />
        <BorrowerVisitComments id={id} isSubmit={isSubmit} />
        <CashAtHandList id={id} isSubmit={isSubmit} />
        <CashAtHandComments id={id} isSubmit={isSubmit} />
        <DocumentationList id={id} isSubmit={isSubmit} />
        <DocCheckComments id={id} isSubmit={isSubmit} />
        <AuditIssuesList id={id} isSubmit={isSubmit} />
        <CheckEffectivenessList id={id} isSubmit={isSubmit} />
        <FeedbackMtgList id={id} isSubmit={isSubmit} />
        <NameAndSign id={id} isSubmit={isSubmit} data={list.data} />
        {/* {(list.data.isSubmit === 0 || list.data.isSubmit === 3) && (
          <SubmitToManager id={id} />
        )} */}
      </div>
    </div>
  );
};

export default ManagerPreview;
