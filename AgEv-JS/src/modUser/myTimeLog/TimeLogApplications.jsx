import React from "react";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import { useGetData } from "../../hooks/dataApi";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import { format } from "date-fns";
import TopHeader from "../../components/TopHeader";
import PendingButton from "../../components/button/PendingButton";
import RejectButton from "../../components/button/RejectButton";

const TimeLogApplications = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "pendingTimeLogApplications",
    "/PendingTimeLogApplications/list"
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl gap-5">
      <TopHeader
        title="Recommend Time  Log Applications"
        btn="Return"
        path="/myTimeLog"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-9 list-header">
          <ListHeader label="Employee PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Task Date" />
          <ListHeader label="Task Name" />
          <ListHeader label="Task Hour " />
          <ListHeader label="Status" />
          <ListHeader label="Approved By" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.timeLogId}
              className="grid grid-cols-1 md:grid-cols-9 list-body"
            >
              <ListCol label="Employee Name : " value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol
                label="Task  Date : "
                value={format(new Date(item.taskDate), "dd-MMM-yyyy")}
              />
              <ListCol label="Task : " value={item.taskName} />
              {/* <ListCol label="amount : " value={item.taskName} /> */}
              <ListCol label="Task Hour : " value={item.taskHour} />

              <ListCol label="Time Log Status : " value={item.status} />
              <ListCol label="Authority : " value={item.authorityName} />

              <div className="flex justify-end space-x-2 mr-2">
                {item.status === "Pending" && (
                  <PendingButton
                    action={refetch}
                    path={`/pendingTimeLogApplications/StatusUpdate/${item.timeLogId}`}
                  />
                )}
              </div>
              <div className="flex justify-end space-x-2 ">
                {item.status === "Pending" && (
                  <RejectButton
                    action={refetch}
                    path={`/pendingTimeLogApplications/RejectStatusUpdate/${item.timeLogId}`}
                  />
                )}
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

export default TimeLogApplications;
