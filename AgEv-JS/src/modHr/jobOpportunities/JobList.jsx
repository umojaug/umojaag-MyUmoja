import React from "react";
import EditButton from "../../components/button/EditButton";
import DeleteButton from "../../components/button/DeleteButton";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";

const JobList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrjobslist", "/jobs/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl mx-auto">
      <TopHeader title="Job  List" btn="Save" path="/hr/job/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Department" />
          <ListHeader label="Title" />
          <ListHeader label="Status" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.jobId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Department Name:" value={item.departmentName} />
              <ListCol label="Title:" value={item.title} />
              <ListCol label="Title:" value={item.jobStatus} />

              <div className="flex justify-end space-x-2">
                <EditButton path={`/hr/job/edit/${item.jobId}`} />
                <DeleteButton
                  action={refetch}
                  path={`/jobs/delete/${item.jobId}`}
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

export default JobList;
