import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const PrimaryRootCauseList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", "/primaryRootCause/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Primary Root Cause"
        // btn="Save"
        // path="/audit/settings/primaryRootCause/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-2 list-header">
          <ListHeader label="Primary Root Cause" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.primaryRootCauseId}
              className="grid grid-cols-1 md:grid-cols-2 list-body"
            >
              <ListCol
                label="Primary Root Cause:"
                value={item.primaryRootCauseName}
              />
              <div className="flex justify-end space-x-2">
                {/* <EditButton
                  path={`/audit/settings/primaryRootCause/edit/${item.primaryRootCauseId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/primaryRootCause/delete/${item.primaryRootCauseId}`}
                /> */}
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

export default PrimaryRootCauseList;
