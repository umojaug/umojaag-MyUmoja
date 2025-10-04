import React from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import DeleteButton from "../../../components/button/DeleteButton";

const AmAsignList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("AmAsignList", "/AmAssign/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Area Manager List"
        btn="Save"
        path="/admin/settings/am/asign/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-2 list-header">
          <ListHeader label="Area Name" />
          <ListHeader label="Area Manager Name" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.amAssignId}
              className="grid grid-cols-1 md:grid-cols-2 list-body"
            >
              <ListCol label="Area Name:" value={item.areaName} />
              <div className="flex justify-between ">
                <ListCol label="Area Manager Name:" value={item.employeeName} />
                <div className="flex justify-end space-x-2">
                  <DeleteButton
                    action={refetch}
                    path={`/AmAssign/Delete/${item.amAssignId}`}
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

export default AmAsignList;
