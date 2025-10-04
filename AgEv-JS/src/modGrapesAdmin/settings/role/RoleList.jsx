import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import TopHeader from "../../../components/TopHeader";
import Error from "../../../components/Error";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import EditButton from "../../../components/button/EditButton";

const RoleList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("role", "/role/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title={"Role List"}
        btn="Save"
        path="/grapes/settings/role/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-2 list-header">
          <ListHeader label={"Role Name"} />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-2 list-body"
            >
              <ListCol label={`${"Role Name"} :`} value={item.name} />

              <div className="flex justify-end space-x-2">
                <EditButton path={`/grapes/settings/role/edit/${item.id}`} />
                <DeleteButton
                  action={refetch}
                  path={`/role/delete/${item.id}`}
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

export default RoleList;
