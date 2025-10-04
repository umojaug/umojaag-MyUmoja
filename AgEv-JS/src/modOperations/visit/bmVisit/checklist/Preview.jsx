import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../../hooks/dataApi";
import VisitView from "../../components/VisitView";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import GroupVisitList from "./groupvisit/GroupVisitList";
import CashAtHandList from "./cashathand/CashAtHandList";
import OdFollowUpList from "./odfollowupinformation/OdFollowUpList";
import LoanVerificationList from "./loanverification/LoanVerificationList";
import BankInfoIdList from "./bankinfo/BankInfoList";
import DailyReportList from "./dailyreport/DailyReportList";
import Highlights from "./highlights/HighlightsList";
import SubmitToManager from "./SubmitToManager";

const Preview = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("visitdetails", `/bmvisit/detailsview/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const isSubmit = list.data.isSubmit;

  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <div className="px-5">
        <VisitView data={list.data} path="/ops/bm/visit/list" />
        <GroupVisitList id={id} isSubmit={isSubmit} />
        <LoanVerificationList id={id} isSubmit={isSubmit} />
        <OdFollowUpList id={id} isSubmit={isSubmit} />
        <DailyReportList id={id} isSubmit={isSubmit} />
        <CashAtHandList id={id} isSubmit={isSubmit} />
        <BankInfoIdList id={id} isSubmit={isSubmit} />
        <Highlights id={id} isSubmit={isSubmit} />
        {(list.data.isSubmit === 0 || list.data.isSubmit === 3) && (
          <SubmitToManager id={id} />
          // <LinkButton
          //   btnText="Continue Updating"
          //   path={`/ops/bm/visit/checklist/update/${id}`}
          // />
        )}
      </div>
    </div>
  );
};

export default Preview;
