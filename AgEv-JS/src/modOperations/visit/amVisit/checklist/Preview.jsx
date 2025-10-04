import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../../hooks/dataApi";
import VisitView from "../../components/VisitView";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
// import LinkButton from "../../../../components/button/LinkButton";
import GroupVisitList from "./groupvisit/GroupVisitList";
import OdFollowUpList from "./odfollowupinformation/OdFollowUpList";
import CashAtHandList from "./cashathand/CashAtHandList";
import AmRecordKeepingList from "./recordkeeping/AmRecordKeepingList";
import AmBranchPerformanceList from "./branchperformance/AmBranchPerformanceList";
import SubmitToManager from "./SubmitToManager";
import HighlightsList from "./highlights/HighlightsList";

const Preview = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("visitdetails", `/amvisit/detailsview/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const isSubmit = list.data.isSubmit;

  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <VisitView data={list.data} path="/ops/am/visit/list" />
      <CashAtHandList id={id} isSubmit={isSubmit} />
      <GroupVisitList id={id} isSubmit={isSubmit} />
      <OdFollowUpList id={id} isSubmit={isSubmit} />
      <AmRecordKeepingList id={id} isSubmit={isSubmit} />
      <AmBranchPerformanceList id={id} isSubmit={isSubmit} />
      <HighlightsList id={id} isSubmit={isSubmit} />

      {/* {(list.data.isSubmit === 0 || list.data.isSubmit === 3) &&
        list.data.isLock === 0 && (
          <LinkButton
            btnText="Continue Updating"
            path={`/ops/am/visit/checklist/update/${id}`}
          />
        )} */}

      {(list.data.isSubmit === 0 || list.data.isSubmit === 3) && (
        <SubmitToManager id={id} />
        // <LinkButton
        //   btnText="Continue Updating"
        //   path={`/ops/am/visit/checklist/update/${id}`}
        // />
      )}
    </div>
  );
};

export default Preview;
