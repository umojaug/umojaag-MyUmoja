import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../../hooks/dataApi";
import VisitView from "../../components/VisitView";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import CashAtHandList from "./cashathand/CashAtHandList";
import GroupVisitList from "./groupVisit/GroupVisitList";
import DocumentationList from "./documentationCheck/DocumentationList";
import AuditIssuesList from "./auditIssues/AuditIssuesList";
import SubmitToManager from "./SubmitToManager";
import FeedbackMtgList from "./feedbackMtg/FeedbackMtgList";
import PortfolioAnalysisList from "./portfolioAnalysis/PortfolioAnalysisList";
import CheckEffectivenessList from "./checkEffectiveness/CheckEffectivenessList";
import BorrowrVisitList from "./borrowerVisit/BorrowerVisitList";
import NameAndSign from "./nameAndSign/NameAndSign";
import PrintHeaderHtml from "../../../../components/PrintHeaderHtml";

const Preview = () => {
  const { id } = useParams();
  const contentRef = useRef();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("visitdetails", `/allVisit/detailsView/${id}`);

  const {
    data: lists,
    // error,
    // isLoading,
    // isError,
  } = useGetData("employeeinfouserinfo", "/employeeinfo/userinfo");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const isManager =
    list.data.managerId === lists?.data.employeeId ? true : false;
  const isBm =
    list.data.branchManagerId === lists?.data.employeeId ? true : false;

  const isSubmit = list.data.isSubmit;

  return (
    <div className="card w-full max-w-screen-xl gap-2 relative">
      <div className="absolute top-4 right-20">
        <PrintHeaderHtml contentRef={contentRef} />
      </div>
      <div className="px-5 print:p-10 " ref={contentRef}>
        {isSubmit === 0 ? (
          <VisitView data={list.data} path="/ops/visit/list" />
        ) : (isSubmit === 1 || isSubmit === 5) && isBm ? (
          <VisitView data={list.data} path="/ops/bm/review/visit/list" />
        ) : (isSubmit === 1 || isSubmit === 5) && isManager ? (
          <VisitView
            data={list.data}
            path="/ops/supervisor/review/visit/list"
          />
        ) : (
          <VisitView data={list.data} path="/ops/visit/list" />
        )}

        <PortfolioAnalysisList
          id={id}
          isSubmit={isSubmit}
          isManager={isManager}
          isBm={isBm}
        />
        <GroupVisitList
          id={id}
          isSubmit={isSubmit}
          isManager={isManager}
          isBm={isBm}
        />
        <BorrowrVisitList
          id={id}
          isSubmit={isSubmit}
          isManager={isManager}
          isBm={isBm}
        />
        <CashAtHandList
          id={id}
          isSubmit={isSubmit}
          isManager={isManager}
          isBm={isBm}
        />
        <DocumentationList
          id={id}
          isSubmit={isSubmit}
          isManager={isManager}
          isBm={isBm}
        />
        <AuditIssuesList
          id={id}
          isSubmit={isSubmit}
          isManager={isManager}
          isBm={isBm}
        />
        <CheckEffectivenessList
          id={id}
          isSubmit={isSubmit}
          isManager={isManager}
          isBm={isBm}
        />
        <FeedbackMtgList id={id} isSubmit={isSubmit} />
        <NameAndSign id={id} isSubmit={isSubmit} data={list.data} />
        {(list.data.isSubmit === 0 || list.data.isSubmit === 3) && (
          <SubmitToManager id={id} />
        )}
      </div>
    </div>
  );
};

export default Preview;
