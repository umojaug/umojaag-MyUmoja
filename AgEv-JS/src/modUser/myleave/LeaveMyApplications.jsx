import React from "react";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import { useGetData } from "../../hooks/dataApi";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import DeleteButton from "../../components/button/DeleteButton";
import { format } from "date-fns";

const LeaveMyApplications = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("myleavelist", "/myleave/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <div className="flex justify-between px-0 pb-2 text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600">
        History
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-7 list-header">
          <ListHeader label="Leave Name" />
          <ListHeader label="From Date" />
          <ListHeader label="Till Date" />
          <ListHeader label="Particulars" />
          <ListHeader label="Status" />
          <ListHeader label="Authority Name" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.empLeaveId}
              className="grid grid-cols-1 md:grid-cols-7 list-body"
            >
              <ListCol label="Leave Name : " value={item.leaveName} />
              <ListCol
                label="From Date : "
                value={format(new Date(item.fromDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Till Date : "
                value={format(new Date(item.tillDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Particulars : " value={item.particulars} />
              <ListCol label="Leave Status : " value={item.leaveStatus} />
              <ListCol label="Authority Name : " value={item.authorityName} />
              {item.leaveStatus === "Pending" && (
                <div className="flex justify-end space-x-2">
                  <DeleteButton
                    action={refetch}
                    path={`/myleave/delete/${item.empLeaveId}`}
                  />
                </div>
              )}
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

export default LeaveMyApplications;
