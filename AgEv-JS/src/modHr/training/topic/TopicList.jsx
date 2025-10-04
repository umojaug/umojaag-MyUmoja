import React, { useState } from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import SearchHeader from "../../../components/SearchHeader";

const TopicList = () => {
  const [query, setQuery] = useState("");

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrTopiclist", "/topics/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      item.categoryName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    ) {
      return item;
    } else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Training List" btn="Save" path="/hr/training/topic/add" />
      <SearchHeader placeholder="Training" action={setQuery} />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="Category" />
          <ListHeader label="Training" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.topicId}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol label="Category : " value={item.categoryName} />
              <ListCol label="Training : " value={item.title} />
              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/hr/training/topic/edit/${item.topicId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/topics/delete/${item.topicId}`}
                  />
                </div>
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicList;
