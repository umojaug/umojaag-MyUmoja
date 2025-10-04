import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const ModuleList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("appModule", "/module/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Module List"
        btn="Save"
        path="/grapes/settings/module/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="Module Name" />
          <ListHeader label="Icon Name" />
          <ListHeader label="Mobile Icon" />
          <ListHeader label="Link Name" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.moduleId}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol label="Module Name:" value={item.moduleName} />
              <ListCol label="Icon :" value={item.icon} />
              <ListCol label="Mobile Icon :" value={item.iconMobile} />
              <ListCol label="Link :" value={item.link} />
              <div className="flex justify-end space-x-2">
                <EditButton
                  path={`/grapes/settings/module/edit/${item.moduleId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/module/delete/${item.moduleId}`}
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

export default ModuleList;
