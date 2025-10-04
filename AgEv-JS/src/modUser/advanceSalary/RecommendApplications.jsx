import React from "react";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import { useGetData } from "../../hooks/dataApi";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import { format } from "date-fns";
import TopHeader from "../../components/TopHeader";
import TaskButton from "../../components/button/TaskButton";

const RecommendApplications = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData(
    "pendingAdvanceApplicationslist",
    "/pendingAdvanceApplications/list"
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl gap-5">
      <TopHeader
        title="Recommend Advance Salary Applications"
        btn="Return"
        path="/advanceSalary"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-7 list-header">
          <ListHeader label="Employee Name" />
          <ListHeader label="Amount" />
          <ListHeader label="Needed Date" />
          <ListHeader label="Purpose" />
          <ListHeader label="Status" />
          <ListHeader label="Authority Name" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.advanceId}
              className="grid grid-cols-1 md:grid-cols-7 list-body"
            >
              <ListCol label="amount : " value={item.employeeName} />
              <ListCol
                label="amount : "
                value={item.advanceAmount.toLocaleString()}
              />
              <ListCol
                label="Needed Advance Date : "
                value={format(new Date(item.neededAdvanceDate), "dd/MMM/yyyy")}
              />

              <ListCol
                label="Purpose Of Advance : "
                value={item.purposeOfAdvance}
              />
              <ListCol label="Leave Status : " value={item.advanceStatus} />
              <ListCol label="Authority Name : " value={item.authorityName} />
              <div className="flex justify-end space-x-2">
                <TaskButton
                  path={`/advanceSalary/recommendApplications/comments/${item.advanceId}`}
                />
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendApplications;
