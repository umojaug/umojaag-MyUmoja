import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import TopHeader from "../../../components/TopHeader";

const AuthorityMappingList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("appmenu", `/AuthorityMapping/list`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Authority Mapping List"
        btn="Save"
        path="/grapes/settings/authorityMapping/add"
      />
      <div className="list-wrapper mt-4">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="Role Name" />
          <ListHeader label="Button Name" />

          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.apiId}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol label="Role Name:" value={item.role} />
              <ListCol label="Button Name:" value={item.buttonName} />

              <div className="flex justify-end space-x-2">
                <DeleteButton
                  action={refetch}
                  path={`/AuthorityMapping/delete/${item.id}`}
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

export default AuthorityMappingList;
