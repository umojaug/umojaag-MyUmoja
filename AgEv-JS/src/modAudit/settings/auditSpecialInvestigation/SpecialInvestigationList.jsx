import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const SpecialInvestigationList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrSpecialInvestigation", "/auditSpecialInvestigation/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Special Investigation" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="Guideline" />
          <ListHeader label="TestSteps" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.inherentRiskId}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol label=" Guideline:" value={item.guideline} />
              <ListCol label=" TestSteps:" value={item.testSteps} />
              <div className="flex justify-end space-x-2">
                {/* <EditButton
                  path={`/audit/settings/specialInvestigation/edit/${item.specialInvestigationId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/auditSpecialInvestigation/delete/${item.specialInvestigationId}`}
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

export default SpecialInvestigationList;
