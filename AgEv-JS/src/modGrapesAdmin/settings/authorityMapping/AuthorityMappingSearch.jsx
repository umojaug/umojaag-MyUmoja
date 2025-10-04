import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const AuthorityMappingSearch = ({ query }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("appmenu", `/menuAssign/search/${query}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="list-wrapper mt-4">
      <div className="md:grid grid-cols-7 list-header">
        <ListHeader label="User Name" />
        <ListHeader label="Module Name" />
        <ListHeader label="Menu Name" />
        <ListHeader label="Link" />
        <ListHeader label="Icon" />
        <ListHeader label="Mobile Icon" />
        <ListHeader label="" />
      </div>
      {list.data.length > 0 &&
        list.data.map((item) => (
          <div
            key={item.apiId}
            className="grid grid-cols-1 md:grid-cols-7 list-body"
          >
            <ListCol label="User Name:" value={item.fullName} />
            <ListCol label="Manu Name:" value={item.moduleName} />
            <ListCol label="Manu Name:" value={item.menuName} />
            <ListCol label="Link :" value={item.link} />
            <ListCol label="Icon :" value={item.icon} />
            <ListCol label="Mobile Icon:" value={item.iconMobile} />
            <div className="flex justify-end space-x-2">
              <DeleteButton
                action={refetch}
                path={`/menuAssign/delete/${item.menuAssignId}`}
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
  );
};

export default AuthorityMappingSearch;
