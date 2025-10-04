import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import {
  ListCol,
  ListHeader,
} from "../../../../../components/ListColWithHeader";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import { useNavigate } from "react-router-dom";
import GroupVisitEdit from "./GroupVisitEdit";
import GroupVisitBmEdit from "./GroupVisitBmEdit";
import GroupVisitSupervisorEdit from "./GroupVisitSupervisorEdit";

function GroupVisitList({ id, isSubmit, isBm, isManager }) {
  const navigate = useNavigate();
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData(
    "allVerifyLoanApplication",
    `/allVerifyLoanApplication/list/${id}`
  );
  if (isLoading) return <HashLoading />;
  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <TopHeader title="2.	Group Visit & Verification of Loan Application Form:" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-12 list-header">
          <ListHeader className="" label="" />
          <ListHeader className="md:col-span-2" label="Work to be done" />
          <ListHeader label="Status" className="md:flex md:justify-center" />
          <ListHeader label="Number" />
          <ListHeader
            className="md:col-span-2 md:pr-2"
            label="Major Issues Identified"
          />
          <ListHeader className="md:pr-2" label="Steps Taken" />
          <ListHeader className="md:col-span-2 md:pr-2" label="BM Comments" />
          <ListHeader className="md:col-span-2" label="Supervisor Comments" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, index) => (
            <div
              // onClick={() =>
              //   navigate(
              //     isSubmit === 0
              //       ? `/ops/verifyLoanApp/edit/${item.verificationId}`
              //       : isSubmit === 1 && isBm
              //       ? `/ops/verifyLoanApp/bm/edit/${item.verificationId}`
              //       : isSubmit === 1 && isManager
              //       ? `/ops/verifyLoanApp/supervisor/edit/${item.verificationId}`
              //       : null
              //   )
              // }
              key={index}
              className={`grid grid-cols-1 md:grid-cols-12 list-body`}
            >
              <div className="flex gap-2">
                {isSubmit === 0 && <GroupVisitEdit id={item.verificationId} />}
                {isSubmit === 1 && isBm && (
                  <GroupVisitBmEdit id={item.verificationId} />
                )}
                {isSubmit === 1 && isManager && (
                  <GroupVisitSupervisorEdit id={item.verificationId} />
                )}
              </div>
              <ListCol
                className="md:col-span-2"
                label="Work to be done: "
                value={item.workToBeDone}
              />
              <ListCol
                label="Status: "
                value={item.status}
                className="md:flex md:justify-center"
              />
              <ListCol label="Number: " value={item.number} />
              <ListCol
                className="md:col-span-2 md:pr-2"
                label="Major Issues Identified: "
                value={item.findings}
              />
              <ListCol
                className="md:pr-2"
                label="Steps Taken: "
                value={item.takenSteps}
              />
              <ListCol
                className="md:col-span-2 md:pr-2"
                label="BM Comments: "
                value={item.bmComments}
              />
              <ListCol
                className="md:col-span-2"
                label="Supervisor Comments: "
                value={item.supervisorComments}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default GroupVisitList;
