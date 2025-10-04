import React from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import EditButton from "../../components/button/EditButton";
import DeleteButton from "../../components/button/DeleteButton";
import { format } from "date-fns";

const RecruitmentRequestList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("recruitmentRequests", "/recruitmentRequests/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Recruitment Requests"
        btn="Save"
        path="/recruitment/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="Job Title" />
          <ListHeader label="Department" />
          <ListHeader label="Start Date" />
          <ListHeader label="Status" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.recruitmentId}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol label="Job Title:" value={item.jobTitle} />
              <ListCol label="Department:" value={item.departmentName} />
              <ListCol
                label="Start Date:"
                value={format(new Date(item.startDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Status:" value={item.recruitmentStatus} />

              <div className="flex justify-end space-x-2">
                <EditButton path={`/recruitment/edit/${item.recruitmentId}`} />
                <DeleteButton
                  action={refetch}
                  path={`/recruitmentRequests/delete/${item.recruitmentId}`}
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

export default RecruitmentRequestList;
