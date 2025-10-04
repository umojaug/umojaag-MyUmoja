import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const SubMenuList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("appModule", "/AdSubMenu/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  //

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title=" Sub Menu List"
        btn="Save"
        path="/grapes/settings/sub/menu/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-9 list-header">
          <ListHeader label="Module" />
          <ListHeader label="Menu" />
          <ListHeader label="Sub Menu" />
          <ListHeader label="Link" />
          <ListHeader label="Icon" />
          <ListHeader label="Mobile Icon" />
          <ListHeader label="Priority" />
          <ListHeader label="Section" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.subMenuId}
              className="grid grid-cols-1 md:grid-cols-9 list-body"
            >
              <ListCol label="Module:" value={item.moduleName} />
              <ListCol label="Menu:" value={item.menuName} />
              <ListCol label="Sub Menu:" value={item.subMenuName} />
              <ListCol label="Link:" value={item.link} />
              <ListCol label="Icon:" value={item.icon} />
              <ListCol label="Mobile Icon:" value={item.iconMobile} />
              <ListCol label="Priority:" value={item.priority} />
              <ListCol label="Section:" value={item.section} />
              <div className="flex justify-end space-x-2">
                <EditButton
                  path={`/grapes/settings/sub/menu/edit/${item.subMenuId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/adSubMenu/delete/${item.subMenuId}`}
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

export default SubMenuList;
