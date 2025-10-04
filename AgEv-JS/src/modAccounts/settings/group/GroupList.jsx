import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const GroupList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("group", "/acGroup/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Group" btn="Save" path={"/ac/settings/group/add"} />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Main Name" />
          <ListHeader label="Group Code" />
          <ListHeader label="Group Name" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.groupId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Main Name : " value={item.mainName} />
              <ListCol label="Group Code : " value={item.groupCode} />
              <ListCol label="Group Name : " value={item.groupName} />
              <div className="flex justify-end space-x-2">
                <EditButton path={`/ac/settings/group/edit/${item.groupId}`} />
                <DeleteButton
                  action={refetch}
                  path={`/acGroup/delete/${item.groupId}`}
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

export default GroupList;
