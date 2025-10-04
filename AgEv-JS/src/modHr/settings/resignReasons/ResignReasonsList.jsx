import React from "react";
import TopHeader from "../../../components/TopHeader";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import EditButton from "../../../components/button/EditButton";
import DeleteButton from "../../../components/button/DeleteButton";

const ResignReasonsList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("settingResignReasons", "/resignreasons/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Resign Reasons"
        btn="Save"
        path="/hr/settings/resign-reason/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="Reason Name" />
          <ListHeader label="Status" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.resignReasonId}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol label="Reason Name:" value={item.resignReasonName} />
              <ListCol label="Status:" value={item.resignStatus} />
              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/hr/settings/resign-reason/edit/${item.resignReasonId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/resignreasons/delete/${item.resignReasonId}`}
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

export default ResignReasonsList;
