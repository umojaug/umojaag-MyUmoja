import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const KpiList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrkpi", "/kpi/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="KPI" btn="Save" path="/hr/settings/kpi/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="KPI Name" />
          <ListHeader label="Details" className="col-span-2" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.kpiId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="KPI Name : " value={item.kpiName} />
              <ListCol
                label="Details : "
                value={item.details.substring(0, 100)}
                className="col-span-2"
              />
              <div className="flex justify-end space-x-2 mt-2 md:mt-0">
                <EditButton path={`/hr/settings/kpi/edit/${item.kpiId}`} />
                <DeleteButton
                  action={refetch}
                  path={`/kpi/delete/${item.kpiId}`}
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

export default KpiList;
