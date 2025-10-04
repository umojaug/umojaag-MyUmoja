import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const InherentRiskList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrInherentRisk", "/auditinherentrisk/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Inherent Risk"
        // btn="Save"
        // path="/audit/settings/InherentRisk/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="Inherent Risk Name" />
          <ListHeader label="Inherent Risk Value" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.inherentRiskId}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol
                label=" Inherent Risk Name:"
                value={item.inherentRiskName}
              />
              <ListCol
                label=" Inherent Risk Value:"
                value={item.inherentRiskValue}
              />
              <div className="flex justify-end space-x-2">
                {/* <EditButton
                  path={`/audit/settings/inherentrisk/edit/${item.inherentRiskId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/auditinherentrisk/delete/${item.inherentRiskId}`}
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

export default InherentRiskList;
