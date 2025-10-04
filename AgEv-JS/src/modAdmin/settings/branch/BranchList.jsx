import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import { format } from "date-fns";

const BranchList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrBranch", "/branches/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Branch" btn="Save" path="/admin/settings/branch/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-6 list-header">
          <ListHeader label="Division Name" />
          <ListHeader label="Region Name" />
          <ListHeader label="Area Name" />
          <ListHeader label="Branch Name" />
          <ListHeader label="Start Date" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.branchId}
              className="grid grid-cols-1 md:grid-cols-6 list-body"
            >
              <ListCol label="Division Name:" value={item.divisionName} />
              <ListCol label="Region Name:" value={item.regionName} />
              <ListCol label="Area Name:" value={item.areaName} />
              <ListCol label="Branch Name:" value={item.branchName} />
              <ListCol
                label="Start Date : "
                value={format(new Date(item.startDate), "dd/MMM/yyyy")}
              />
              <div className="flex justify-end space-x-2">
                <EditButton
                  path={`/admin/settings/branch/edit/${item.branchId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/branches/delete/${item.branchId}`}
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

export default BranchList;
