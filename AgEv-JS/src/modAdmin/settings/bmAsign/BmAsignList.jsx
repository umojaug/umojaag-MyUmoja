import React from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import DeleteButton from "../../../components/button/DeleteButton";

const BmAsignList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("AmAsignList", "/BmAssign/List");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Branch Manager List"
        btn="Save"
        path="/admin/settings/bm/asign/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="Region  Name" />
          <ListHeader label="Area Name" />
          <ListHeader label="Branch  Name" />
          <ListHeader label="Branch Manager Name" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.amAsignId}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol label="Region Name:" value={item.regionName} />
              <ListCol label="Area Name:" value={item.areaName} />
              <ListCol label="Branch Name:" value={item.branchName} />
              <ListCol label="Branch Manager Name:" value={item.employeeName} />

              <div className="flex justify-end space-x-2">
                <DeleteButton
                  action={refetch}
                  path={`/BmAssign/Delete/${item.bmAssignId}`}
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

export default BmAsignList;
