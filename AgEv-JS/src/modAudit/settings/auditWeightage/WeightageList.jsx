import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const WeightageList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrWeightage", "/auditweightage/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Weightage"
        // btn="Save"
        // path="/audit/settings/Weightage/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Weightage Name" />
          <ListHeader label="Weightage Range From" />
          <ListHeader label="Weightage Range To" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.weightageId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Weightage Name:" value={item.weightageName} />
              <ListCol
                label="Weightage Range From:"
                value={item.weightageRangeFrom}
              />
              <ListCol
                label="Weightage Range To:"
                value={item.weightageRangeTo}
              />
              <div className="flex justify-end space-x-2">
                {/* <EditButton
                  path={`/audit/settings/weightage/edit/${item.weightageId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/auditweightage/delete/${item.weightageId}`}
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

export default WeightageList;
