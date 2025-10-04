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
import CashAtHandEdit from "./CashAtHandEdit";
import CashAtHandBmEdit from "./CashAtHandBmEdit";
import CashAtHandSupervisorEdit from "./CashAtHandSupervisorEdit";

function CashAtHandList({ id, isSubmit, isManager, isBm }) {
  const navigate = useNavigate();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("allCashBalance", `/allCashBalance/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <TopHeader title="4.	Cash in hand/Bank/M-Pesa balance:" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-12 list-header">
          <ListHeader className="" label="" />
          <ListHeader className="md:col-span-2" label="Work to be done" />
          <ListHeader label="Status" className="md:flex md:justify-center" />
          <ListHeader
            className="md:col-span-2 md:pr-2"
            label="Major Issues Identified "
          />
          <ListHeader className="md:pr-2" label="Steps Taken" />
          <ListHeader className="md:col-span-2 md:pr-2" label="BM Comments" />
          <ListHeader className="md:col-span-3" label="Supervisor Comments" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, index) => (
            <div
              // onClick={() =>
              //   navigate(
              //     isSubmit === 0
              //       ? `/ops/cashBalanceList/edit/${item.cashBalanceId}`
              //       : isSubmit === 1 && isBm
              //       ? `/ops/allvisit/cashBalance/bm/edit/${item.cashBalanceId}`
              //       : isSubmit === 1 && isManager
              //       ? `/ops/allvisit/cashBalance/supervisor/edit/${item.cashBalanceId}`
              //       : null
              //   )
              // }
              key={index}
              className={`grid grid-cols-1 md:grid-cols-12 list-body`}
            >
              <div className="flex gap-2">
                {isSubmit === 0 && <CashAtHandEdit id={item.cashBalanceId} />}
                {isSubmit === 1 && isBm && (
                  <CashAtHandBmEdit id={item.cashBalanceId} />
                )}
                {isSubmit === 1 && isManager && (
                  <CashAtHandSupervisorEdit id={item.cashBalanceId} />
                )}
              </div>
              <ListCol
                className="md:col-span-2"
                label="Work To Be Done :"
                value={item.workToBeDone}
              />
              <ListCol
                label="Status :"
                value={item.status}
                className="md:flex md:justify-center"
              />
              <ListCol
                className="md:col-span-2 md:pr-2"
                label="Major Issues Identified :"
                value={item.identifiedMajor}
              />
              <ListCol
                className="md:pr-2"
                label="Steps Taken :"
                value={item.takenSteps}
              />
              <ListCol
                className="md:col-span-2 md:pr-2"
                label="Comments Of BM :"
                value={item.bmComments}
              />
              <ListCol
                className="md:col-span-3"
                label="Comments Of Supervisor "
                value={item.supervisorComments}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default CashAtHandList;
