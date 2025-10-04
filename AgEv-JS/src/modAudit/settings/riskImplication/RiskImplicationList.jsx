import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const RiskImplicationList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", "/riskImplication/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Risk Implication"
        // btn="Save"
        // path="/audit/settings/riskImplication/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-2 list-header">
          <ListHeader label="Risk Implication" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.riskImplicationId}
              className="grid grid-cols-1 md:grid-cols-2 list-body"
            >
              <ListCol
                label="Risk Implication:"
                value={item.riskImplicationName}
              />
              <div className="flex justify-end space-x-2">
                {/* <EditButton
                  path={`/audit/settings/riskImplication/edit/${item.riskImplicationId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/riskImplication/delete/${item.riskImplicationId}`}
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

export default RiskImplicationList;
