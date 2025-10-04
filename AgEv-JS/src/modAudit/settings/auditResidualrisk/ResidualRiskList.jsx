import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const ResidualRiskList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrResidualRisk", "/auditresidualrisk/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Residual Risk"
        // btn="Save"
        // path="/audit/settings/ResidualRisk/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="Residual Risk Name" />
          <ListHeader label="Residual Risk Value" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.residualRiskId}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol
                label=" Residual Risk Name:"
                value={item.residualRiskName}
              />
              <ListCol
                label=" Residual Risk Value:"
                value={item.residualRiskValue}
              />
              <div className="flex justify-end space-x-2">
                {/* <EditButton
                  path={`/audit/settings/residualrisk/edit/${item.residualRiskId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/auditresidualrisk/delete/${item.residualRiskId}`}
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

export default ResidualRiskList;
