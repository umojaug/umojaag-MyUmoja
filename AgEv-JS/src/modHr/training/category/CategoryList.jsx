import React from "react";
import TopHeader from "../../../components/TopHeader";

import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import EditButton from "../../../components/button/EditButton";
import DeleteButton from "../../../components/button/DeleteButton";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const CategoryList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("categoryslist", "/category/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Category" btn="Save" path="/hr/training/category/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-2 list-header">
          <ListHeader label="Category" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.categoryId}
              className="grid grid-cols-1 md:grid-cols-2 list-body"
            >
              <ListCol label="Category:" value={item.categoryName} />
              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/hr/training/category/edit/${item.categoryId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/category/delete/${item.categoryId}`}
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

export default CategoryList;
