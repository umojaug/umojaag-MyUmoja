import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const AuditAreaList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("settingsauditArea", "/auditTestAreas/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Audit Test Area"
        // btn="Save"
        // path="/audit/settings/testarea/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="Audit Area Type" />
          <ListHeader label="Audit Area Name" />
          <ListHeader label="Priority" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.auditAreaId}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol label="Audit Area Type:" value={item.auditAreatype} />
              <ListCol label="Audit Area Name:" value={item.auditAreaName} />
              <ListCol label="Priority:" value={item.priority} />
              <div>
                <div className="flex justify-end space-x-2">
                  {/* <EditButton
                    path={`/audit/settings/testarea/edit/${item.auditAreaId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/auditTestAreas/delete/${item.auditAreaId}`}
                  /> */}
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

export default AuditAreaList;
