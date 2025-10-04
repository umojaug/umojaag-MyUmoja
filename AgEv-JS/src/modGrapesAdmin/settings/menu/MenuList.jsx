import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const MenuList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("appModule", "/adMenu/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Menu List"
        btn="Save"
        path="/grapes/settings/menu/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-7 list-header">
          <ListHeader label="Module" />
          <ListHeader label="Menu" />
          <ListHeader label="Link" />
          <ListHeader label="Icon" />
          <ListHeader label="Mobile Icon" />
          <ListHeader label="Priority" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.menuId}
              className="grid grid-cols-1 md:grid-cols-7 list-body"
            >
              <ListCol label="Module Name:" value={item.moduleName} />
              <ListCol label="Menu Name:" value={item.menuName} />
              <ListCol label="Link:" value={item.link} />
              <ListCol label="Icon:" value={item.icon} />
              <ListCol label="Mobile Icon:" value={item.iconMobile} />
              <ListCol label="Priority:" value={item.priority} />
              <div className="flex justify-end space-x-2">
                <EditButton
                  path={`/grapes/settings/menu/edit/${item.menuId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/adMenu/delete/${item.menuId}`}
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

export default MenuList;
