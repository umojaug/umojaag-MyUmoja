import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const RegionList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrRegion", "/regions/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Region" btn="Save" path="/admin/settings/region/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="Division Name" />
          <ListHeader label="Region Name" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.regionId}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol label="Division Name:" value={item.divisionName} />
              <ListCol label="Region Name:" value={item.regionName} />
              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/admin/settings/region/edit/${item.regionId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/regions/delete/${item.regionId}`}
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

export default RegionList;
