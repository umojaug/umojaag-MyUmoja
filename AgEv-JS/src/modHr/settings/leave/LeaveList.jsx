import React from "react";
import TopHeader from "../../../components/TopHeader";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import EditButton from "../../../components/button/EditButton";
import DeleteButton from "../../../components/button/DeleteButton";

const LeaveList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("settingLeave", "/leaves/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Leave" btn="Save" path="/hr/settings/leave/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Leave Name" />
          <ListHeader label="Short Code" />
          <ListHeader label="Yearly Leave" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.leaveId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Leave Name:" value={item.leaveName} />
              <ListCol label="Short Code:" value={item.shortCode} />
              <ListCol label="Yearly Leave:" value={item.yearlyLeave} />
              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/hr/settings/leave/edit/${item.leaveId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/leaves/delete/${item.leaveId}`}
                  />
                </div>
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

export default LeaveList;
