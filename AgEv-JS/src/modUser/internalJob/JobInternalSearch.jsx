import React, { useState } from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import SearchHeader from "../../components/SearchHeader";
import { AiOutlineFile } from "react-icons/ai";
import TopHeader from "../../components/TopHeader";
import TaskButton from "../../components/button/TaskButton";

const JobInternalSearch = () => {
  const [query, setQuery] = useState("");

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("cvbank", `/JobInternal/list`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      item.companyName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.departmentName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    ) {
      return item;
    } else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl mx-auto">
      <TopHeader title="Internal Job List" />
      <SearchHeader
        action={setQuery}
        placeholder=" Country / Department/ title"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Country" />
          <ListHeader label="Department" />
          <ListHeader label="Title" />

          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Country Name :" value={item.companyName} />
              <ListCol label="Department Name :" value={item.departmentName} />
              <ListCol label="Title :" value={item.title} />

              <div className="flex justify-end space-x-1 px-1">
                <TaskButton path={`/internal/job/details/${item.jobId}`} />
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobInternalSearch;
