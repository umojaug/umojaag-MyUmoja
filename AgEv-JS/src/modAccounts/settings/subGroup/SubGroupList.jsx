import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const SubGroupList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("subGroup", "/acSubGroup/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Sub Group"
        btn="Save"
        path={"/ac/settings/subGroup/add"}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="Main Name" />
          <ListHeader label="Group" />
          <ListHeader label="Sub Group Code" />
          <ListHeader label="Sub Group Name" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.subGroupId}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol label="Main Name : " value={item.mainName} />
              <ListCol label="Group : " value={item.groupName} />
              <ListCol label="Sub Group Code: " value={item.subGroupCode} />
              <ListCol label="Sub Group : " value={item.subGroupName} />

              <div className="flex justify-end space-x-2">
                <EditButton
                  path={`/ac/settings/subGroup/edit/${item.subGroupId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/acsubGroup/delete/${item.subGroupId}`}
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

export default SubGroupList;
