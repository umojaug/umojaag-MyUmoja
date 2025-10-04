import React from "react";
import TopHeader from "../../../components/TopHeader";

import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import EditButton from "../../../components/button/EditButton";
import DeleteButton from "../../../components/button/DeleteButton";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const StaffTypeList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrStaffType", "/staffTypes/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Staff Type"
        btn="Save"
        path="/hr/settings/staff-type/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-2 list-header">
          <ListHeader label="Staff Type" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.staffTypeId}
              className="grid grid-cols-1 md:grid-cols-2 list-body"
            >
              <ListCol label="Staff Type:" value={item.staffTypeName} />
              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/hr/settings/staff-type/edit/${item.staffTypeId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/staffTypes/delete/${item.staffTypeId}`}
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

export default StaffTypeList;
